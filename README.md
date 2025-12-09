# Playwright SwagLabs POM

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
![Playwright](https://img.shields.io/badge/Playwright-1.x-2D4DFF?logo=playwright)
![JavaScript](https://img.shields.io/badge/JavaScript-ESM-yellow?logo=javascript)
![Platform](https://img.shields.io/badge/Platform-Web-green)

Учебный, но инженерно оформленный тестовый фреймворк на **Playwright + Page Object Model**  
для приложения **SauceDemo (SwagLabs)**. Проект служит фундаментом для AI-генерации тестов  
(Mini-Project C) и демонстрирует подход уровня Senior / Automation Architect.

## 🔧 Стек

- **Playwright 1.x** (Chromium / Firefox / WebKit)
- **Page Object Model (POM)**
- Выделенные карты локаторов: `src/locators`
- Универсальные helpers:
  - `src/utils/actions.js` (stable click, fill, blur)
  - `src/utils/asserts.js` (expect wrappers)
- Структурированные тесты: `src/tests`
- Глобальный фильтр сетевых запросов (`fixtures.js`)

## 📁 Структура

- `src/pages` — Page Objects (Login, Home, Inventory)
- `src/locators` — декларативные карты локаторов
- `src/data` — данные для тестов
- `src/utils` — actions/asserts helpers
- `src/tests` — login + inventory + меню
- `src/tests/helpers` — helpers для тестов
- `fixtures.js` — beforeEach, очистка контекста, сетевые фильтры
- `playwright.config.js` — конфиг, репортеры, baseURL
- `package.json` — сборка, линтер, тесты
- `README.md` — описание

## 🚀 Запуск

```bash
npm install
npm test            # все тесты
npm run test:ui     # UI-режим Playwright
npm run test:headed # Headless режим Playwright
npm run test:debug  # debug режим Playwright
```

## 🧩 Что демонстрирует фреймворк

- Чистая архитектура POM + helpers + локаторы
- Стабильная работа бургер-меню:
  - ожидание aria-hidden
  - transform → открыто/закрыто
  - fallback-селекторы (getMenuWrapSelector)
- Контролируемая навигация:
  - переход в новой вкладке
  - переход в той же вкладке
  - goBack() после внешних страниц
- Подготовка к AI-слою генерации тестов:
  - стандартизованные actions/asserts
  - формализованные страницы
  - чистые и короткие тесты

## 📜 Лицензия

MIT — see [LICENSE](./LICENSE)

## ⭐ Автор

Alisher — SDET / Automation Engineer
Web · Mobile · AI-driven Testing
https://github.com/alisher-sdet
