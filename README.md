# Playwright SwagLabs POM

Учебный, но инженерно оформленный тестовый фреймворк на **Playwright + Page Object Model**  
для приложения **SauceDemo (SwagLabs)**. Проект служит фундаментом для AI-генерации тестов  
(Mini-Project C) и демонстрирует подход уровня Senior / Automation Architect.

## 🔧 Стек

- Node.js, Playwright
- Page Object Model (POM)
- Выделенные локаторы (`src/locators`)
- Helpers (`src/utils/actions.js`, `src/utils/asserts.js`)
- Чистые тесты (`src/tests`)

## 📁 Структура

- `src/pages` — Page Objects (Login, Home, Inventory)
- `src/locators` — декларативные карты локаторов
- `src/data` — данные для тестов
- `src/utils` — actions/asserts helpers
- `src/tests` — login + inventory + меню
- `src/tests/helpers` — helpers для тестов
- `fixtures.js` — beforeEach, очистка контекста, сетевые фильтры
- `playwright.config.js` — конфиг, репортеры, baseURL

## 🚀 Запуск

```bash
npm install
npm test            # все тесты
npm run test:ui     # UI-режим Playwright
npm run test:headed # Headless режим Playwright
npm run test:debug  # debug режим Playwright
```
