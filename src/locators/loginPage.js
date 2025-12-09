// src/locators/loginPage.js

// Декларативная карта локаторов для страницы логина Swag Labs.
// Минимум полей, максимум ясности.

export const loginLocators = {
	// Поля ввода
	userNameInput: "#user-name",
	passwordInput: "#password",

	// Кнопка логина
	loginButton: "#login-button",

	// Сообщение об ошибке логина
	errorMessage: "[data-test='error']",
};
