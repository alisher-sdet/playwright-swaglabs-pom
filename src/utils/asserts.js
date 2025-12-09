// src/utils/asserts.js
import { expect } from "@playwright/test";

/**
 * Ожидание, что локатор видим.
 * Использует expect → красивые сообщения и интеграция с репортом.
 */
export async function expectVisible(locator) {
	await expect(locator).toBeVisible();
}

/**
 * Ожидание точного текста (или RegExp).
 */
export async function expectText(locator, textOrRegex) {
	await expect(locator).toHaveText(textOrRegex);
}

/**
 * Ожидание количества элементов.
 */
export async function expectCount(locator, count) {
	await expect(locator).toHaveCount(count);
}
