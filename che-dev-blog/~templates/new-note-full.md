---
title: <% tp.file.title %> # Название заметки
description:        # Краткое описание для поиска и SEO
tags: []            # Теги ["example", "guide", "quartz"]
aliases: []         #  Синонимы ["старый-путь", "/другой-путь"]

# Управление публикацией
draft: false        # true = скрыть как черновик
publish: true       # false = отключить публикацию вручную

# Язык и URL
lang: ru            # Язык контента
permalink:          # Кастомный URL /my-note

# Внешний вид
enableToc: true     # Включить оглавление
cssclasses: []      # Пользовательские CSS-классы ["custom-style"]

# Соцсети (мета-данные)
socialDescription:  # "Описание для соцсетей" 
socialImage:        # Путь к изображению /images/preview.png

# Даты
created: <% tp.date.now("YYYY-MM-DD HH:mm") %>  # Создано
modified: <% tp.date.now("YYYY-MM-DD HH:mm") %> # Отредактировано
published: <% tp.date.now("YYYY-MM-DD") %>      # Опубликовано
---

