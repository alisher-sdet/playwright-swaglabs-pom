// tests/fixtures.js
import { test as base } from "@playwright/test";

export const test = base.extend({
	/* можно добавить свои fixtures */
});

test.beforeEach(async ({ page, context }) => {
	//
	// 1) Чистим контекст (делаемы окружение чистым»)
	//
	await context.clearCookies();
	await context.clearPermissions();
	// Удаляем/отключаем service workers (безопасно), чтобы они не кешировали лишнее
	await page.goto("about:blank");
	await page
		.evaluate(async () => {
			if ("serviceWorker" in navigator) {
				const regs = await navigator.serviceWorker.getRegistrations();
				for (const r of regs) await r.unregister();
			}
		})
		.catch(() => {});

	//
	// 2) Один глобальный фильтр сетевых запросов на уровне context
	//
	await context.route("**/*", (route) => {
		const url = route.request().url();

		let hostname = "";
		let pathname = "";
		try {
			const u = new URL(url);
			hostname = u.hostname;
			pathname = u.pathname;
		} catch {
			// если URL странный (about:blank и т.п.) — пропускаем
			return route.continue();
		}

		//
		// Группа 1. Backtrace / submit?universe — технический шум
		//
		if (hostname.includes("backtrace.io") || /submit\?universe=/i.test(url)) {
			return route.fulfill({
				status: 204,
				contentType: "text/plain",
				body: "",
			});
		}

		//
		// Группа 2. JSON-данные Next.js на saucelabs.com
		//   /_next/data/.../*.json  (pricing.json, request-demo.json, ai.json, index.json, ...)
		//
		if (
			hostname === "saucelabs.com" &&
			pathname.startsWith("/_next/data/") &&
			pathname.endsWith(".json")
		) {
			return route.fulfill({
				status: 204,
				contentType: "application/json",
				body: "{}", // пустой JSON вместо 403
			});
		}

		// //
		// // Группа 3. Лишний 404 по /inventory.html на saucedemo
		// //
		// if (hostname === "www.saucedemo.com" && pathname === "/inventory.html") {
		// 	return route.fulfill({
		// 		status: 204,
		// 		contentType: "text/html",
		// 		body: "",
		// 	});
		// }

		//
		// Группа 4. Analytics / трекеры / пиксели / теги
		// (можно расширять по мере необходимости)
		//
		if (
			pathname.includes("analytics") ||
			pathname.includes("telemetry") ||
			hostname.includes("googletagmanager.com") ||
			hostname.includes("google-analytics.com") ||
			hostname.includes("clarity.ms") ||
			hostname.includes("snap.licdn.com") ||
			(hostname.includes("reddit") && pathname.includes("pixel")) ||
			hostname.includes("facebook.com") ||
			hostname.includes("bat.bing.com") ||
			hostname.includes("doubleclick.net") ||
			hostname.includes("munchkin.marketo.net") ||
			hostname.includes("ml314.com") ||
			hostname.includes("g2.com") ||
			hostname.includes("clearbit.com") ||
			hostname.includes("navattic.com") ||
			hostname.includes("techtarget.com")
		) {
			return route.fulfill({
				status: 204,
				contentType: "text/plain",
				body: "",
			});
		}

		// всё остальное — честно пропускаем
		return route.continue();
	});
});

export const expect = test.expect;
