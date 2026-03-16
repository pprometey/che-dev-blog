---
title: Поиск в Visual Studio
description: Шпаргалка по поиску в Visual Studio
lang: ru
draft: true
publish: false
tags: 
  - VS
  - cheats
created: 2025-11-28 13:56
---

## Быстрый поиск по всему решению

**Ctrl+Shift+F**  
- Поддерживает **регулярные выражения**
- Можно искать **по файлам, которые не открыты**, и **внешним папкам**
Регулярки включаются галкой **Use Regular Expressions**.  
Например:
- Поиск методов: `public\s+\w+\s+\w+\(`
- Поиск GUID: `[0-9A-Fa-f]{8}-([0-9A-Fa-f]{4}-){3}[0-9A-Fa-f]{12}`

## Поиск символов (быстрее, чем искать текст)

**Ctrl+T** (или **Ctrl+,**)  
Пишешь имя класса, метода, файла, даже если не полностью.  
Фишки:
- `t:Foo` – искать только типы
- `m:GetUser` - искать методы
- `f:Repository` – искать файлы
- `#MySymbol` – искать по символам Roslyn

## Поиск по текущему файлу

**Ctrl+F**, но:
- **Alt+Enter** – показать все совпадения списком
- **Enter** – переход к следующему, **Shift+Enter** – назад
- Можно включить **search up** (стрелочка вверх у поиска)

## Поиск по истории

Visual Studio запоминает предыдущие запросы:
- **стрелка вниз** в поле Find показывает буфер запросов  
    Полезно когда надо повторить одинаковые проверки по разным файлам.
  
## Поиск ссылок на символ

**Shift+F12**  
Иксовская фича, но мощная:
- Показывает все места использования
- Можно фильтровать: чтение, запись, вызов, наследование
- Работает точнее, чем глобальный текстовый поиск

## Поиск в Watch/Autos/Locals
В окне отладки (Watch):
- Просто начни печатать – есть inline фильтрация
- Можно искать переменные по части имени

## Поиск в Git Changes

Открой **Git Changes** -> Ctrl+F  
Искать можно в diffs, а не только в файлах.

## Интеллектуальный поиск с "Go To All" через фильтры

Хотя уже писал выше, но ключевые хитрости:
- `@` – искать в строках (string literals)
- `=` – искать по полному совпадению имени
- `"` – искать только открытые файлы
- `?` – fuzzy search, когда помнишь лишь куски

## Поиск по командной палитре

**Ctrl+Q**  
Например:
- "format document"
- "nuget"
- "rename"  
	То есть искать не код, а команды IDE.

## Поиск по стэктрейсу

Если вставить стэктрейс в текстовый редактор:
- Ctrl+Click – переход к методам
- Работает без копирования проекта

---

Короткая шпаргалка по поиску в Visual Studio (EN):

- Ctrl+T – Go To All (types, files, members). Filters:
        - t: (types), m: (methods), f: (files), @ (strings), = (exact)
- Ctrl+Shift+F – Search in Solution. Supports regex.
- Ctrl+F – Search in file.
    - Alt+Enter – list all matches.
- Shift+F12 – Find All References. Filters: read/write/call/derived.
- Ctrl+Q – Search commands (Command Palette).
- Search in diffs: Git Changes -> Ctrl+F.
- Debug windows (Watch/Locals): type to filter.
