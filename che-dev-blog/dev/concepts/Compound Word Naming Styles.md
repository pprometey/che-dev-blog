---
title: Compound Word Naming Styles
description: An overview of the most common compound word naming styles, such as camelCase, snake_case, kebab-case, and others. The article explains their usage, differences, and how they affect code readability and editing convenience
lang: en
draft: false
publish: true
tags: ["code style", "dev", "naming-conventions"]
created: 2025-07-20 00:52
---

Let’s look at the most common **compound word naming styles**.

When writing code, it is often necessary to name something (a class, variable, method, parameter, etc.), and it is critically important that the name is clear and understandable to others. However, a typical language parser treats each word as a separate token. This is why compound words are often used in naming. It is essential to choose a consistent naming style to maintain uniformity across a project or workspace.

## Compound word styles

Naming style | Example
--- | ---
Raw string with spaces | `some awesome var`
**Camel Case** | `someAwesomeVar`
**Snake Case** | `some_awesome_var`
**Kebab Case** | `some-awesome-var`
**Pascal Case** | `SomeAwesomeVar`
**Upper Case Snake Case** | `SOME_AWESOME_VAR`

### camelCase

In `camelCase`, the name starts with a lowercase letter, and each subsequent word starts with an uppercase letter. All words are written together without spaces or separators.

Example of `camelCase` for the phrase `camel case var` – **`camelCaseVar`**.

### snake_case

To use the `snake_case` style, replace spaces with underscores. All letters are lowercase. Sometimes `snake_case` is mixed with `camelCase` or `PascalCase`, but this decreases readability and defeats the purpose of having a consistent style.

Example of `snake_case` for the phrase `snake case var` – **`snake_case_var`**.

### kebab-case

`kebab-case` is similar to `snake_case`, but uses hyphens instead of underscores. All letters are lowercase. This style can also be mixed with others, but doing so has little benefit and typically adds confusion.

Example of `kebab-case` for the phrase `kebab case var` – **`kebab-case-var`**.

One additional thing to consider when using `kebab-case` is how most text editors treat it: each segment separated by a hyphen is recognized as an individual word. As a result, double-clicking highlights only one segment (e.g., `kebab` or `case`), and when navigating with the keyboard, the cursor moves between segments instead of jumping across the entire compound word. This can make editing less convenient compared to styles like `camelCase` or `snake_case`, where the name is treated as a single word.

### PascalCase

In `PascalCase`, every word starts with an uppercase letter (unlike `camelCase`, where the first word starts lowercase).

Example of `PascalCase` for the phrase `pascal case var` – **`PascalCaseVar`**.

Note: This style is often confused with `camelCase`, but it is a distinct naming convention.

### UPPER_CASE_SNAKE_CASE

In `UPPER_CASE_SNAKE_CASE`, all letters are uppercase and words are separated by underscores.

Example of `UPPER_CASE_SNAKE_CASE` for the phrase `upper case snake case var` – **`UPPER_CASE_SNAKE_CASE_VAR`**.

## Usage recommendations

### File names

For manually created files, it is advisable to use the **`snake_case`** notation. This preserves readability and reduces the risk of issues on case-sensitive file systems. For example, a file might be named using `PascalCase`, but a developer might refer to it in code using `camelCase`. On Windows or macOS, this discrepancy typically goes unnoticed, but on Linux, where the file system is case-sensitive, it can lead to runtime errors. Using `snake_case` for file names helps avoid such problems.
