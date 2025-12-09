// src/pages/InventoryPage.js
import { inventoryLocators } from "../locators/inventoryPage.js";
import { expectVisible } from "../utils/asserts.js";

export class InventoryPage {
	constructor(page) {
		this.page = page;
		this.locators = inventoryLocators;
	}

	/**
	 * Жёсткая проверка, что страница продуктов загружена.
	 * Используется в тестах и AI-генератором.
	 */
	async expectLoaded() {
		// основной контейнер со списком
		await expectVisible(this.page.locator(this.locators.container));
		// хотя бы один товар (минимальная гарантия, что список реально отрисован)
		await expectVisible(this.page.locator(this.locators.item).first());
	}

	/**
	 * Мягкая проверка (boolean), если нужно только узнать состояние.
	 * Можно вообще не использовать в тестах, а оставить для внутренних сценариев.
	 */
	async isLoaded() {
		return this.page.locator(this.locators.container).isVisible();
	}

	/**
	 * Возвращает полную информацию по всем товарам.
	 */
	async getAllProducts() {
		const items = this.page.locator(this.locators.item);
		const count = await items.count();

		const result = [];

		for (let i = 0; i < count; i++) {
			const item = items.nth(i);

			const nameLocator = item.locator(this.locators.itemName);
			const priceLocator = item.locator(this.locators.itemPrice);

			const name = (await nameLocator.textContent()).trim();
			const priceTextRaw = await priceLocator.textContent();
			const price = parseFloat(priceTextRaw.replace("$", "").trim());

			result.push({
				element: item,
				name,
				nameLocator,
				priceLocator,
				price,
				priceText: priceTextRaw.trim(),
			});
		}

		return result;
	}

	// Только массив наименований
	async getNames() {
		const products = await this.getAllProducts();
		return products.map((p) => p.name);
	}

	// Только массив цен
	async getPrices() {
		const products = await this.getAllProducts();
		return products.map((p) => p.price);
	}

	// Сортировка: value ∈ ['az','za','lohi','hilo']
	async sortBy(value) {
		await this.page.locator(this.locators.sort.select).selectOption(value);
	}

	// Добавить товар в корзину по имени
	async addToCartByName(name) {
		const items = this.page.locator(this.locators.item);
		const count = await items.count();

		for (let i = 0; i < count; i++) {
			const item = items.nth(i);
			const itemName = await item.locator(this.locators.itemName).textContent();

			if (itemName.trim() === name) {
				await item.locator(this.locators.addToCartButtonPrefix).click();
				return;
			}
		}

		throw new Error(`Product with name '${name}' not found`);
	}

	// Кол-во товаров в бейджике корзины
	async getCartCount() {
		const badge = this.page.locator(this.locators.cartBadge);

		try {
			if (!(await badge.isVisible())) {
				return 0;
			}
		} catch {
			return 0;
		}

		const text = await badge.textContent();
		return parseInt(text || "0", 10);
	}
}
