---
title: Database Migration Naming Rules
description: Naming convention for database migrations in .NET projects using EF Core
lang: en
draft: false
publish: true
tags: ["dev", "dotnet", "ef core", "naming conventions", "code style"]
created: 2025-07-20 21:38
---

When creating a new migration in a .NET project using EF Core, follow these naming rules:

1. **Keep it short.** The name should be concise: ideally up to 10 characters, with a maximum of 30. Examples: `AddVerifyInfo`, `EntityAddSystemProperty`.
2. **Use meaningful English.** The name should be clear and self-explanatory for an English-speaking developer. Examples: `AddVerifyInfo`, `DigitalSignChangeFK`.
3. **Ensure uniqueness.** Migration names must be unique within the project.
4. **Use PascalCase.** Write names in [[Compound Word Naming Styles | PascalCase]], without spaces, underscores, or special separators. Examples: `AddLogoSettings`, `AddVerifyInfo`.
5. **Be consistent.** Use a unified naming approach. All migrations should follow the same pattern and be stored in the `Migrations` folder.
6. **Avoid special characters.** Do not use symbols like `@`, `#`, `&`, etc. Invalid examples: `name@`, `name#`, `name&`.
7. **Don't include dates.** Dates are added automatically when a migration is created and should not be part of the name.

### Examples

**Incorrect:**

* `Add-Migration Add_New_column_to_some_table`
* `Add-Migration addSmthToSmwhr`
* `Add-Migration "Create new migration"`
* `Add-Migration VeryVeryLongAndSenselessMigrationName`
* `Add-Migration Some@migration-name`
* `Add-Migration 20201013_CreateMigration`

**Correct:**

* `Add-Migration CreateTableEntityType`
* `Add-Migration EntityAddColumnType`
* `Add-Migration FieldRenameColumnName`
