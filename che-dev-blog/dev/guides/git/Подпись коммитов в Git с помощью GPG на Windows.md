---
title: Подпись коммитов в Git с помощью GPG на Windows
description: В этом руководстве описано, как создать и использовать GPG-ключ для подписания коммитов в Git на Windows. Это позволяет гарантировать, что изменения действительно были сделаны вами, а не кем-то другим.
lang: ru
draft: false
publish: true
tags: ["git","gpg","security","dev"]
created: 2025-07-15 13:18
---

По умолчанию Git не проверяет, действительно ли имя и email автора коммита принадлежат реальному человеку. Любой может указать произвольные данные, что создаёт риск фальсификации истории изменений. В определённых случаях это позволяет выдать чужие коммиты за свои — например, с целью внедрения вредоносного кода.

Чтобы удостовериться, что коммиты действительно принадлежат доверенному автору, Git поддерживает их подпись с помощью GPG.

Визуально это выглядит так (скриншот с GitHub):

![Подписанный коммит](gpg-git-1752906013640.png)

## Подготовка

Сначала установите GPG для Windows — [Gpg4win](https://www.gpg4win.org/download.html).
При установке обязательно выберите компонент **GPG Agent**.

## Создание ключей

Откройте терминал (PowerShell или Git Bash) и выполните:

```sh
gpg --full-generate-key
```

В терминале появится:

```powershell
Please select what kind of key you want:
   (1) RSA and RSA
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
   (9) ECC (sign and encrypt) *default*
  (10) ECC (sign only)
  (14) Existing key from card
Your selection? 1          # Выбираем RSA and RSA

RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (3072) 4096
Requested keysize is 4096 bits  # Длина ключа 4096 бит

Key is valid for? (0) 1y         # Срок действия — 1 год
Key expires at: ...              # Подтверждаем

Real name: Alexei Chernyavsky    # Имя как в GitHub
Email address: email@example.org
Comment: example.org

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O  # Подтверждаем
```

После этого нужно ввести надёжный пароль для защиты закрытого ключа.

Чтобы увидеть идентификатор ключа (Key ID), используйте:

```sh
gpg --list-secret-keys --keyid-format LONG
```

Пример вывода:

```sh
sec   rsa4096/98F2EBC6C153DED5E26D579E9B1CACC547A80702 2025-07-19 [SC]
      uid   [ultimate] Alexei Chernyavsky (example.org) <email@example.org>
      ssb   rsa4096/7C7183969D84B1A3 2025-07-19 [E]
```

Скопируйте длинный идентификатор ключа после `rsa4096/` — он понадобится для настройки Git

## Экспорт открытого ключа

Теперь экспортируем открытую часть ключа в файл:

```sh
gpg --armor --export email@example.org > ./pubkey_email_example_org.asc
```

Замените `email@example.org` на ваш адрес. В результате публичный gpg ключ сохраниться в файл `pubkey_email_example_org.asc`.

## Загрузка ключа на GitHub

Перейдите в [настройки GPG-ключей GitHub](https://github.com/settings/keys), нажмите **New GPG Key** и вставьте содержимое файла `pubkey_email_example_org.asc`.

В заголовке (Title) можно указать email или описание ключа.

Если всё сделано верно, GitHub отобразит новый ключ и начнёт проверять подписи коммитов.

![GPG на GitHub](gpg-git-1752909721523.png)

Можно загрузить несколько ключей, если вы используете разные ключи для разных проектов.

## Настройка Git

Указываем путь к GPG:

```sh
git config --global gpg.program "C:\Program Files (x86)\GnuPG\bin\gpg.exe"
```

Устанавливаем ключ для подписи [[Несколько git профилей в одной учетной записи Windows|для профиля по умолчанию]] (здесь замените идентификатор `98F2EBC6C153DED5E26D579E9B1CACC547A80702` на свой, который скопировали ранее):

```sh
git config --global user.signingkey 98F2EBC6C153DED5E26D579E9B1CACC547A80702
```

Включаем автоматическую подпись всех коммитов:

```sh
git config --global commit.gpgsign true
```

Теперь при создании коммита Git будет подписывать его с помощью GPG. При этом откроется окно, в котором нужно будет ввести пароль к закрытому ключу.

В результате выполнения этих комманд в файле `.gitconfig` появятся строки:

```ini
[user]
  signingkey = 98F2EBC6C153DED5E26D579E9B1CACC547A80702
[commit]
  gpgsign = true
[gpg]
  program = C:\\Program Files (x86)\\GnuPG\\bin\\gpg.exe
```

## Проверка подписи

Проверить, что коммит подписан, можно командой:

```sh
git log --show-signature
```

Git выведет информацию о том, был ли коммит подписан и каким ключом.

