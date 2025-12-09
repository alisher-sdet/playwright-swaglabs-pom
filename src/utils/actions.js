// src/utils/actions.js

/**
 * Безопасный ввод текста с явным ожиданием видимости
 * и аккуратным blur элемента.
 */
export async function fillAndBlur(page, selector, value) {
	const el = page.locator(selector);

	// Ждём, что элемент появился и видим
	await el.waitFor({ state: "visible" });

	// Очищаем и вводим
	await el.fill(value);

	// Явный blur для поля (надёжнее, чем Tab по клавиатуре)
	await el.blur();
}

/**
 * Стабильный клик по элементу:
 * - ждём видимости
 * - скроллим при необходимости
 * - кликаем
 */
export async function clickStable(page, selector) {
	const el = page.locator(selector);

	await el.waitFor({ state: "visible" });
	await el.scrollIntoViewIfNeeded();
	await el.click();
}

/**
 * Ожидание совпадения URL по паттерну/строке.
 * Удобно использовать после навигации.
 */
export async function waitForUrlMatch(page, pattern) {
	await page.waitForURL(pattern, { waitUntil: "load" });
}
