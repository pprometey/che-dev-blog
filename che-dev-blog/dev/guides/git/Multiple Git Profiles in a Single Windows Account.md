---
title: Multiple Git Profiles in a Single Windows Account
description: How to configure different Git profiles for work and personal projects in Windows
lang: en
draft: false
publish: true
tags: ["git", "dev"]
created: 2025-07-19 15:24
---

Typically, people use a corporate Git account with their work email for job-related tasks, and a personal one for side projects.

This guide shows how to separate these profiles so that work projects are signed with work credentials, and personal ones with personal credentials.

Here’s the directory structure I use:

```sh
.                 # Root of the disk (d:)
└── projects      # Projects directory
    └── chernyavsky   # Personal projects
    └── company1.com  # Work projects for "Acme Corp"
    └── company2.kz   # Work projects for "Bridle & Spur LLC"
```

Git uses two levels of configuration: global and local. A local `.gitconfig` is stored in the project folder; the global one lives in the user's home directory on Windows.

To see all current settings and their sources, run:

```sh
git config --list --show-origin
```

We’re interested in the global `.gitconfig`, typically located at:
`C:\Users\<Username>\.gitconfig`

It defines the default user name and email:

```sh
git config --global user.name "Alexei Chernyavsky"
git config --global user.email example@gmail.com
```

Run these commands right after installing Git — otherwise, you won’t be able to make commits.

This will add the following to your `.gitconfig`:

```ini
[user]
	name = Alexei Chernyavsky
	email = example@gmail.com
```

Usually, this is your personal account.

To add a work profile, create a file named `.gitconfig-company1_com` next to the global config, with the following content:

```ini
[user]
	name = Alexei Chernyavsky
	email = a.chernyavsky@company1.com
	signingkey = A4978EBEA94B8EA9DF5CC748131DC8B25EC79DF2D
```

> If you're [[Signing Git Commits with GPG on Windows|using GPG to sign commits]], don’t forget to include the `signingkey`.

Now link it in the global `.gitconfig` by adding a conditional include for the relevant directory:

```ini
[user]
	name = Alexei Chernyavsky
	email = example@gmail.com

[includeIf "gitdir/i:d:/projects/company1.com/**"]
	path = .gitconfig-company1_com
```

After this, all repositories inside `d:/projects/company1.com/` will use your work name and email.

Verify with:

```sh
git config --get user.email
```

If you're inside a repository within the work directory (i.e., a folder containing a `.git`), this command will return your work profile’s email.
