// src/pages/LoginPage.js
import { loginLocators } from "../locators/loginPage.js";
import { homeLocators } from "../locators/homePage.js";
import { clickStable, fillAndBlur } from "../utils/actions.js";
import { expectVisible } from "../utils/asserts.js";

export class LoginPage {
	constructor(page) {
		this.page = page;
	}

	async goto() {
		// baseURL настроен в playwright.config.js
		await this.page.goto("/", { waitUntil: "domcontentloaded" });
	}

	/**
	 * Страница логина загружена: поля и кнопка видимы.
	 */
	async expectLoaded() {
		await expectVisible(this.page.locator(loginLocators.userNameInput));
		await expectVisible(this.page.locator(loginLocators.passwordInput));
		await expectVisible(this.page.locator(loginLocators.loginButton));
	}

	async typeUserName(username) {
		await fillAndBlur(this.page, loginLocators.userNameInput, username);
	}

	async typePassword(password) {
		await fillAndBlur(this.page, loginLocators.passwordInput, password);
	}

	async submit() {
		await clickStable(this.page, loginLocators.loginButton);
	}

	/**
	 * Высокоуровневый happy-path логин.
	 */
	async login(username, password) {
		await this.goto();
		await this.expectLoaded(); // 👈 теперь форма проверяется явно
		await this.typeUserName(username);
		await this.typePassword(password);
		await this.submit();

		// Проверяем, что попали на домашнюю страницу
		await expectVisible(this.page.locator(homeLocators.appLogo));
	}

	/**
	 * Ожидание сообщения об ошибке логина.
	 * Удобно для негативных сценариев.
	 */
	async expectLoginError() {
		await expectVisible(this.page.locator(loginLocators.errorMessage));
	}
}
