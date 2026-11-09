# Playwright SauceDemo: Page Object Model

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
![Playwright](https://img.shields.io/badge/Playwright-1.x-2D4DFF?logo=playwright)
![JavaScript](https://img.shields.io/badge/JavaScript-ESM-yellow?logo=javascript)

## Описание

Тесты на Playwright с паттерном Page Object для демо-приложения [SauceDemo](https://www.saucedemo.com).

**Покрытие:** вход в систему, страница каталога (inventory), боковое меню. [Тестов: N.]

## Стек

- Playwright 1.x (Chromium / Firefox / WebKit)
- JavaScript (ESM), Node.js
- Page Object Model, карты локаторов, вспомогательные функции для действий и проверок

## Структура

- `src/pages` — Page Objects (Login, Home, Inventory)
- `src/locators` — карты локаторов
- `src/data` — тестовые данные
- `src/utils` — `actions.js` (клик, ввод, потеря фокуса), `asserts.js` (обёртки над `expect`)
- `src/tests` — тесты (вход, каталог, меню) и `src/tests/helpers`
- `fixtures.js` — [укажите путь] перед каждым тестом: очистка контекста, фильтрация сетевых запросов (аналитика, трекинг)
- `playwright.config.js` — настройки запуска и `baseURL`

## Запуск

```bash
npm install
npx playwright install   # браузеры, при первом запуске
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
