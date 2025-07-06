---
title: Obsidian + Quartz + Cloudflare Pages (ru)
lang: ru
draft: false
publish: true
tags: [Obsidian, Quartz, "Cloudflare Pages", "Static Generator Site", sgs, Markdown, devops]
created: 2025-07-04 07:26
---

## Почему Obsidian + Quartz

У меня всегда была некоторая "слабость" к статическим генераторам сайтов. За последние годы я перепробовал множество из них - для ведения блогов, проектной документации, баз знаний и прочего. VuePress, Hugo, Jekyll, MkDocs, DocFix, Cobalt, GitBook, Zola, Gatsby, Metalsmith, Scully - это лишь те, что первыми приходят на ум.

Главная проблема, с которой я постоянно сталкивался - это накладные расходы: время и усилия, необходимые, чтобы превратить черновики в полноценный опубликованный сайт. Обычно я начинал с написания текста в своей личной системе заметок (раньше это был OneNote, а с 2022 года - Obsidian), а затем копировал эти материалы в проект со статическим генератором. В итоге получались два источника истины: черновик в заметках и финальная версия в проекте SGS. Со временем эти версии начинали расходиться, и чаще всего я забрасывал одну из них - обычно черновики в системе заметок.

Дополнительную головную боль доставляло то, что у каждого генератора свои шаблоны и структура. Один поддерживает один вариант Markdown, другой - другой, с разной степенью расширения. Каждый раз приходилось адаптировать тексты и структуру файлов под конкретный инструмент. И далеко не всегда генератор позволял реализовать задуманное - приходилось искать компромиссы.

И вот я нашел священный грааль для ведения заметок и их дальнейшей публикации - это связка [Obsidian](https://obsidian.md/) и [Quartz v4](https://quartz.jzhao.xyz). Можно в одном месте вести все свои заметки, с помощью такого удобного инструмента для ведения заметок как Obsidian и выборочно публиковать нужные из них. Obsidian предоставляет удобный редактор текстов в разметке markdown, причем позволяет это делать даже тем пользователям, кто не знаком с этой разметкой. Об Obsidian можно говорить много и долго, это не просто редактор makrdown файлов - кто-то его использует как  универсальное рабочее пространство, кто-то как расширитель своего мозга - на удивление гибкий инструмент, благодаря своей архитектуре и продуманному UI/UX. Можно даже сказать, что это современная альтернатива  emacs с его org-mode на минималках.

В связке с генератором статистических сайтов Quartz, который в духе с философией Obsidian такой же гибкий и настраиваемый, но в то же время легкий и дружелюбный для новичков,  Obsidian превращается в очень удобное средство ведения заметок и их дальнейшей публикации. Это мой победитель на текущий момент. Единственное чего мне не хватает в Quartz - это создание мультиязычных версий сайта.

Подход к созданию проекта для связки хранилища Obsidian и Quartz, описанный в [официальной документации Quartz](https://quartz.jzhao.xyz/#-get-started) мне мне очень нравится, так как делает хранилище частью самого проекта Quartz, подтягивает всю историю его коммитов. Понятно что это достаточно дружелюбно для новичков, убирает всю сложность работы с Git, но для меня как программиста - это ужасно. Поэтому мы будем делать связку Obsidian и Quartz в более "программистском" стиле, и публиковать сайт на Cloudflare Pages, как более [предпочтительный вариант для c точки зрения ограничений Quartz](https://quartz.jzhao.xyz/hosting#github-pages), чем вариант с публикацией на GitHub Pages.

## Руководство по развертыванию: Obsidian + Quartz + Cloudflare Pages

### 0. Структура каталогов и файлов

```bash
. # Корневая директория (che-dev-blog-src)
├── quartz        # Каталог Quartz
│   └── content
│   └── ...
└── che-dev-blog  # Каталог хранилища Obsidian
    ├── .obsidian
    ├── ~templates
    │   └── new-note.md
    ├── unsorted
    ├── index.md
    └── ...
```

### 1. Создание репозитория GitHub

- Создайте новый репозиторий на GitHub (например, `che-dev-blog`)
- Клонируйте его на локальный компьютер:

```bash
    git clone https://github.com/your-username/che-dev-blog.git che-dev-blog-src
    cd che-dev-blog-src
```

### 2. Добавление Quartz как поддерева (subtree)

Добавьте Quartz (ветка v4) в подпапку `quartz/`:

```bash
git subtree add --prefix=quartz https://github.com/jackyzha0/quartz.git v4 --squash
```

Для обновления в будущем:

```bash
git subtree pull --prefix=quartz https://github.com/jackyzha0/quartz.git v4 --squash
```

### 3. Создание хранилища Obsidian

- В корне проекта создайте папку для хранилища Obsidian (например, `che-dev-blog/`)
- Откройте Obsidian -> «Открыть папку как хранилище» -> выберите папку `che-dev-blog/`
- Эта папка будет содержать ваши Markdown-записи

Далее:

- Настройте нужные вам плагины и шаблоны в Obsidian
- Создайте новую заметку с именем `index` в корне хранилища - она станет вашей главной страницей

### 4. Настройка Quartz

1. Удалите папку `quartz/content` (в ней только `.gitkeep`):

```bash
rm -rf quartz/content

# в Windows: `rmdir /s /q quartz\content`
```

2. Создайте символическую ссылку `quartz/content`, указывающую на папку Obsidian:
3. 
```bash
ln -s che-dev-blog quartz/content

# в Windows - от имени администратора:  
# в cmd: `mklink /D quartz\content che-dev-blog`  
# в PowerShell: `New-Item -ItemType SymbolicLink -Path "quartz\content" -Target "che-dev-blog"`
```

> **Важно:** в примере команды выполняются из корня проекта. При необходимости скорректируйте пути.

### 5. Сборка сайта и запуск в режиме разработки

Перейдите в папку `quartz`, соберите сайт и запустите сервер разработки:

```bash
cd quartz  
npx quartz build --serve
    
# можно запускать и из корня проекта, Quartz CLI поддерживает параметр `--directory=../che-dev-blog`
```

- Команда `npx quartz build` компилирует сайт и сохраняет статические файлы в папку `quartz/public`
- Опция `--serve` запускает локальный сервер с автообновлением - удобно для предпросмотра по адресу http://localhost:8080/

### 6. Развертывание Quartz-сайта через Cloudflare Pages

#### Отправка изменений в GitHub

Перед развертыванием на Cloudflare убедитесь, что все локальные изменения зафиксированы и отправлены:

```bash
git add .  
git commit -m "Deploy: update site content and config"  
git push origin main
```

#### Размещение на Cloudflare Pages

- Перейдите на https://dash.cloudflare.com/ и войдите в свою учётную запись
- В боковом меню выберите **Compute (Workers) -> Workers & Pages**
- Нажмите **Create application -> Pages -> Connect to Git**
- Выберите свой репозиторий GitHub (например, `che-dev-blog`)
- В разделе **Set up builds and deployments** укажите:

Опция | Значение
--- | ---
Project name | Укажите какое бы доменное имя вы бы хотели иметь перед `.pages.dev`. Название проекта определяет адрес сайта.
Production branch | main  
Framework preset | None
Build command | `mkdir -p quartz/content && cp -r che-dev-blog/. quartz/content/ && cd quartz && npm install && npx quartz build`
Build output directory | `quartz/public`

- Нажмите **Save and deploy**

Once the site is generated, it will be available at: https://<project_name_in_cloudflare_page>.pages.dev (I named the project `chernyavsky` and in my case it is https://chernyavsky.pages.dev)

С этого момента при каждом пуше в ветку `main` Cloudflare Pages будет автоматически пересобирать и обновлять сайт.
