# 🚀 Swag Labs Automation Framework

A WebdriverIO-based test automation framework for end-to-end testing of the Swag Labs application, including Allure reporting, structured page objects, and data-driven testing. 

Functionality such as logging in, logging out, viewing products, viewing individual product, cart and checkout flows were included in the scope for this framework

---

## 📁 Project Structure

```
.
├── allure-report/           # Allure HTML report output
├── allure-results/          # Raw test results for Allure
├── node_modules/
├── test/
│   ├── helpers/             # Custom test helpers
│   ├── pageobjects/         # Page Object Model files
│   ├── specs/               # Test specs (organized by feature)
│   └── testdata/            # JSON test data files
├── .gitignore
├── package.json
├── wdio.conf.js             # WebdriverIO configuration file
```

---

## 🔧 Setup & Installation

1. **Clone the repository**

```bash
git clone <repo-url>
cd <project-folder>
```

2. **Install dependencies**

```bash
npm install
```

---

## 🚀 Running Tests

```bash
npx wdio run wdio.conf.js
```

---

## 📊 Generating Allure Report

1. Run tests to generate `allure-results/`
2. Generate and open the report:

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## 📦 Scripts (from package.json)

```json
"scripts": {
  "test": "wdio run wdio.conf.js",
  "allure:generate": "allure generate allure-results --clean -o allure-report",
  "allure:open": "allure open allure-report"
}
```

---

## ✅ Features

- Page Object Model design pattern
- Allure report integration with history and categories
- Test data via external JSON files
- CI/CD-ready executor metadata




---

## 📁 Best Practices

- Keep page objects minimal and reusable
- Use helpers for setup logic (e.g., login, cart setup)
- Add Allure steps and categories for rich reporting
- Store large test data externally

---


