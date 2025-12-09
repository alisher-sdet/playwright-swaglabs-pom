// src/pages/HomePage.js
import { homeLocators } from "../locators/homePage.js";
import { clickStable, waitForUrlMatch } from "../utils/actions.js";
import { expectVisible } from "../utils/asserts.js";

export class HomePage {
	constructor(page) {
		this.page = page;
		this.locators = homeLocators;
		this._menuWrapSelector = null; // кеш найденного селектора
	}

	/**
	 * Проверка, что мы на домашней странице (Products).
	 */
	async expectLoaded() {
		await expectVisible(this.page.locator(this.locators.appLogo));
		await expectVisible(this.page.locator(this.locators.title));
	}

	/**
	 * Текст заголовка (Swag Labs)
	 */
	get headerText() {
		return this.page.locator(this.locators.appLogo);
	}

	get secondaryHeaderText() {
		return this.page.locator(this.locators.title);
	}

	/**
	 * Находит рабочий селектор обёртки меню среди нескольких кандидатов.
	 * 1) this.locators.menuWrap
	 * 2) ".bm-menu-wrap" (дефолт библиотеки)
	 * 3) "#menu_button_container .bm-menu-wrap" (запасной вариант)
	 */
	async getMenuWrapSelector() {
		if (this._menuWrapSelector) return this._menuWrapSelector;

		const candidates = [
			this.locators.menuWrap,
			".bm-menu-wrap",
			"#menu_button_container .bm-menu-wrap",
		].filter(Boolean);

		for (const sel of candidates) {
			let count = 0;
			try {
				count = await this.page.locator(sel).count();
			} catch {
				count = 0;
			}
			if (count > 0) {
				this._menuWrapSelector = sel;
				return sel;
			}
		}

		throw new Error(
			`Menu wrapper not found. Tried selectors: ${candidates.join(", ")}`
		);
	}

	/**
	 * Открытие бургер-меню с учётом анимаций и aria-hidden.
	 */
	async openMenu() {
		const burgerBtn = this.locators.menuButton || "#react-burger-menu-btn";
		const menuWrap = await this.getMenuWrapSelector();

		// 1) Кликаем по бургеру стабильно
		await clickStable(this.page, burgerBtn);

		// 2) Ждём, пока wrapper точно появится в DOM
		await this.page.waitForSelector(menuWrap, {
			state: "attached",
			timeout: 3000,
		});

		// 3) Ждём, пока меню реально откроется
		await this.page
			.waitForFunction(
				(sel) => {
					const el = document.querySelector(sel);
					if (!el) return false;

					const aria = el.getAttribute("aria-hidden");
					if (aria === "false") return true;

					const tf = window.getComputedStyle(el).transform || "";
					// закрытое состояние: matrix(... -300, 0)
					return !tf.includes("-300");
				},
				menuWrap,
				{ timeout: 3000 }
			)
			.catch(() => {
				// Если не дождались — не валим тест жёстко,
				// так сохраняем совместимость с прежним поведением.
			});
	}

	/**
	 * Закрытие меню (через крестик или повторный клик по бургеру).
	 */
	async closeMenu() {
		const closeBtn =
			this.locators.menu.closeMenuButton || "#react-burger-cross-btn";
		if ((await this.page.locator(closeBtn).count()) > 0) {
			await clickStable(this.page, closeBtn);
		} else {
			// fallback: click burger to toggle
			await clickStable(this.page, this.locators.menuButton);
		}
		// маленькая пауза на анимацию
		await this.page.waitForTimeout(200);
	}

	/**
	 * Навигация по пунктам меню: allItems / about / logout / reset.
	 * Возвращает { page, href, target } — удобно для тестов и AI.
	 */
	async navigateToSection(section) {
		const locator = this.locators.menu[section];
		if (!locator) {
			throw new Error(`Menu section '${section}' not found`);
		}

		const el = this.page.locator(locator);
		await el.waitFor({ state: "visible", timeout: 3000 });
		await el.scrollIntoViewIfNeeded();

		const href = await el.getAttribute("href").catch(() => null);
		const target = await el.getAttribute("target").catch(() => null);

		if (target === "_blank") {
			// Открытие в новом табе
			const [newPage] = await Promise.all([
				this.page.context().waitForEvent("page"),
				el.click(),
			]);
			await newPage.waitForLoadState("load");
			return { page: newPage, href, target };
		}

		// Открытие в текущем табе (например, saucelabs.com)
		await Promise.all([
			waitForUrlMatch(this.page, /saucelabs\.com/).catch(() => null),
			el.click(),
		]);

		return { page: this.page, href, target };
	}
}
