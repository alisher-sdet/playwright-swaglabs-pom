# Playwright SauceDemo: Page Object Model

[![CI](https://github.com/alisher-sdet/playwright-swaglabs-pom/actions/workflows/playwright.yml/badge.svg)](https://github.com/alisher-sdet/playwright-swaglabs-pom/actions/workflows/playwright.yml)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
![Playwright](https://img.shields.io/badge/Playwright-1.x-2D4DFF?logo=playwright)
![JavaScript](https://img.shields.io/badge/JavaScript-ESM-yellow?logo=javascript)

> **Происхождение проекта.** Учебный проект. При работе использовался ИИ-ассистент.
> **Что сделал я:** запуск и отладка тестов, настройка CI в GitHub Actions.
> **Чего здесь нет:** API-тестов, TypeScript, Allure-отчётов, запуска в Firefox и WebKit.

## Описание

Тесты на Playwright с паттерном Page Object для демо-приложения [SauceDemo](https://www.saucedemo.com).

**Покрытие (8 тестов в 2 файлах):**

- вход: успешный вход, заблокированный пользователь, неверные данные;
- каталог: загрузка списка (6 товаров), сортировка по цене и по названию, добавление товара в корзину;
- меню: переход на страницу About и возврат.

## Стек

- Playwright 1.x (Chromium), JavaScript (ESM), Node.js
- Page Object Model, карты локаторов, вспомогательные функции для действий и проверок

## Структура

- `src/pages` — Page Objects (Login, Home, Inventory)
- `src/locators` — карты локаторов
- `src/data` — тестовые данные
- `src/utils` — `actions.js` (клик, ввод, потеря фокуса), `asserts.js` (обёртки над `expect`)
- `src/tests` — тесты (`login.spec.js`, `inventory.spec.js`) и `helpers`
- `src/fixtures.js` — действия перед каждым тестом: очистка контекста, фильтрация сетевых запросов (аналитика, трекинг)
- `playwright.config.js` — настройки запуска и `baseURL`

## Запуск

```bash
npm ci
npx playwright install chromium
npm test                 # все тесты
npm run test:ui          # интерактивный режим Playwright
npm run test:headed      # с видимым окном браузера
npm run test:debug       # отладка
```

## Что в проекте реализовано

- **Бургер-меню:** ожидание состояния меню (`aria-hidden`, анимация), запасные селекторы.
- **Навигация:** переход по внешним ссылкам в новой и в той же вкладке, возврат назад.
- **Сетевые запросы:** блокировка лишних запросов (аналитика, трекинг), чтобы тесты не зависели от сторонних сервисов.

## Лицензия

MIT, см. [LICENSE](./LICENSE).
