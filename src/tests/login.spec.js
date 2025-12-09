// src/tests/login.spec.js

import { test, expect } from "../fixtures.js";
import { users } from "../data/users.js";
import { LoginPage } from "../pages/LoginPage.js";
import { HomePage } from "../pages/HomePage.js";
import {
	loginAsStandardUser,
	loginAsLockedOutUser,
	loginWithCredentials,
} from "./helpers/auth.js";

test.describe("Login page", () => {
	test("standard user can login and see Products page", async ({ page }) => {
		const homePage = new HomePage(page);

		await loginAsStandardUser(page);

		// Проверяем, что домашняя страница реально отображается
		await homePage.expectLoaded();
	});

	test("locked out user sees error message", async ({ page }) => {
		const loginPage = await loginAsLockedOutUser(page);

		// Ожидаем ошибку логина
		await loginPage.expectLoginError();
	});

	test("invalid credentials show error message", async ({ page }) => {
		const loginPage = new LoginPage(page);

		await loginPage.goto();
		await loginPage.expectLoaded();

		// Полностью некорректные креды
		await loginPage.typeUserName(users.invalid.username);
		await loginPage.typePassword(users.invalid.password);
		await loginPage.submit();

		// Ожидаем ошибку логина
		await loginPage.expectLoginError();
	});
});
