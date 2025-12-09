/**
 * Полезные команды:
 *   npx playwright test --ui
 *   npx playwright test --headed
 *   npx playwright show-report
 */

import { test, expect } from "../fixtures.js";
import { users } from "../data/users.js";
import { loginAsStandardUser } from "./helpers/auth.js";
import { LoginPage } from "../pages/LoginPage.js";
import { HomePage } from "../pages/HomePage.js";
import { InventoryPage } from "../pages/InventoryPage.js";

// // Небольшой helper для логина стандартным пользователем.
// // Удобно и человеку, и будущему AI.
// async function loginAsStandardUser(page) {
// 	const loginPage = new LoginPage(page);
// 	await loginPage.login(users.standard.username, users.standard.password);
// 	return loginPage;
// }

test.describe("Menu navigation", () => {
	test("go to About and back", async ({ page }) => {
		const homePage = new HomePage(page);

		await loginAsStandardUser(page);
		// await expect(page.locator(homePage.locators.title)).toHaveText("Products");
		await homePage.expectLoaded();

		// открываем бургер-меню
		await homePage.openMenu();

		// переход в About
		const res = await homePage.navigateToSection("about");

		// проверяем href (коротко и надежно)
		expect(res.href).toMatch(/saucelabs\.com/);

		// если навигация открыла новую вкладку — проверяем в ней и закрываем
		if (res.page !== page) {
			await expect(res.page).toHaveURL(/saucelabs/);
			await res.page.close();
		} else {
			// если перешли в той же вкладке — проверяем URL и затем вернуться
			await expect(page).toHaveURL(/saucelabs/);
			await page.goBack();
		}

		// убеждаемся, что Products page
		// await expect(page.locator(homePage.locators.title)).toHaveText("Products");
		await homePage.expectLoaded();
	});
});

test.describe("Inventory products", () => {
	test("products list loads with 6 items", async ({ page }) => {
		const homePage = new HomePage(page);
		const inventoryPage = new InventoryPage(page);

		await loginAsStandardUser(page);
		// await expect(page.locator(homePage.locators.title)).toHaveText("Products");
		await homePage.expectLoaded();
		await inventoryPage.expectLoaded();

		const products = await inventoryPage.getAllProducts();

		// для SauceDemo ожидаем 6 товаров
		expect(products.length).toBe(6);
	});

	test("sort by price: low to high and high to low", async ({ page }) => {
		const homePage = new HomePage(page);
		const inventoryPage = new InventoryPage(page);

		await loginAsStandardUser(page);
		// await expect(page.locator(homePage.locators.title)).toHaveText("Products");
		await homePage.expectLoaded();
		await inventoryPage.expectLoaded();

		// 1) Сортировка по цене: low -> high
		await inventoryPage.sortBy("lohi");
		const pricesLow = await inventoryPage.getPrices();
		const expectedLow = [...pricesLow].sort((a, b) => a - b);
		expect(pricesLow).toEqual(expectedLow);

		// 2) Сортировка по цене: high -> low
		await inventoryPage.sortBy("hilo");
		const pricesHigh = await inventoryPage.getPrices();
		const expectedHigh = [...pricesHigh].sort((a, b) => b - a);
		expect(pricesHigh).toEqual(expectedHigh);
	});

	test("sort by name: A→Z and Z→A", async ({ page }) => {
		const homePage = new HomePage(page);
		const inventoryPage = new InventoryPage(page);

		await loginAsStandardUser(page);
		// await expect(page.locator(homePage.locators.title)).toHaveText("Products");
		await homePage.expectLoaded();
		await inventoryPage.expectLoaded();

		// 1) Сортировка по наименованию: A -> Z
		await inventoryPage.sortBy("az");
		const namesAZ = await inventoryPage.getNames();
		const expectedAZ = [...namesAZ].sort((a, b) => a.localeCompare(b));
		expect(namesAZ).toEqual(expectedAZ);

		// 2) Сортировка по наименованию: Z -> A
		await inventoryPage.sortBy("za");
		const namesZA = await inventoryPage.getNames();
		const expectedZA = [...namesZA].sort((a, b) => b.localeCompare(a));
		expect(namesZA).toEqual(expectedZA);
	});

	test("add product to cart from list updates cart badge", async ({ page }) => {
		const homePage = new HomePage(page);
		const inventoryPage = new InventoryPage(page);

		await loginAsStandardUser(page);
		// await expect(page.locator(homePage.locators.title)).toHaveText("Products");
		await homePage.expectLoaded();
		await inventoryPage.expectLoaded();

		// из списка возьмём первый товар
		const products = await inventoryPage.getAllProducts();
		const firstProductName = products[0].name;

		// до добавления в корзине 0
		expect(await inventoryPage.getCartCount()).toBe(0);

		// добавляем этот товар
		await inventoryPage.addToCartByName(firstProductName);

		// проверяем badge
		expect(await inventoryPage.getCartCount()).toBe(1);
	});
});
