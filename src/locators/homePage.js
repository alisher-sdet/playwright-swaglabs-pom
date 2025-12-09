// src/locators/homePage.js
// Локаторы для верхней части страницы: header, меню, корзина, сортировка

export const homeLocators = {
	// основной wrapper / header
	contentsWrapper: "#contents_wrapper",
	headerContainer: "[data-test='header-container']",
	primaryHeader: "[data-test='primary-header']",

	// кнопка меню (бургер)
	menuButton: "#react-burger-menu-btn", // button element
	menuOpenIcon: "[data-test='open-menu']", // img inside burger button
	menuWrap: ".bm-menu-wrap", // контейнер меню (может быть hidden)
	menuList: ".bm-item-list",

	// ссылки в меню (All Items / About / Logout / Reset)
	menu: {
		allItems: "[data-test='inventory-sidebar-link']",
		about: "[data-test='about-sidebar-link']",
		logout: "[data-test='logout-sidebar-link']",
		reset: "[data-test='reset-sidebar-link']",
		closeMenuButton: "#react-burger-cross-btn",
		closeMenuIcon: "[data-test='close-menu']",
	},

	// логотип / заголовок приложения
	appLogo: ".app_logo",
	shoppingCartLink: "[data-test='shopping-cart-link']",
	shoppingCartContainer: "#shopping_cart_container",

	// вторичный header (title, сортировка)
	secondaryHeader: "[data-test='secondary-header']",
	title: "[data-test='title']", // текст "Products"

	// сортировка
	sort: {
		container: "[data-test='product-sort-container']", // select element
		activeOption: "[data-test='active-option']",
	},
};
