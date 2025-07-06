---
title: Obsidian + Quartz + Cloudflare Pages (en)
lang: en
draft: false
publish: true
tags: [Obsidian, Quartz, "Cloudflare Pages", "Static Generator Site", sgs, Markdown, devops]
created: 2025-07-04 09:32
---

## Why Obsidian + Quartz

I've always had a bit of a soft spot for static site generators. Over the years, I've tried many of them for different purposes - blogs, project documentation, knowledge bases, and more. VuePress, Hugo, Jekyll, MkDocs, DocFix, Cobalt, GitBook, Zola, Gatsby, Metalsmith, Scully - these are just the ones that immediately come to mind.

The biggest pain point I kept running into was the overhead - the time and effort it takes to get from raw content to a polished published product. My typical workflow involved drafting content in my personal knowledge base and notes app (originally OneNote, then since 2022 - Obsidian), and later transferring those notes into the static site project. This inevitably created two sources of truth: the original draft in my note-taking system, and the published version in the generator project. Over time, these would drift apart, and more often than not, I’d abandon one of them - usually the drafts.

Another common issue: every generator had its own templating system and directory structure. Some supported one flavor of Markdown, others another - with varying levels of support for extensions. Every time I switched tools, I had to adapt both my content and its structure. And not every generator allowed me to fully realize what I had in mind - compromises were always part of the deal.

I think I may have finally found my holy grail for writing and publishing notes: the combination of [Obsidian](https://obsidian.md/) and [Quartz v4](https://quartz.jzhao.xyz).

With this setup, I can keep all my notes in one place - Obsidian, which is an incredibly intuitive and flexible markdown-based note-taking app. Even users unfamiliar with markdown can work productively in it thanks to its polished UI/UX. There's a lot to be said about Obsidian - it's not just a markdown editor. Some treat it as a personal knowledge hub, others as an "extended brain". Its modular architecture and thoughtful design make it almost like a lightweight, modern alternative to Emacs with org-mode.

When paired with the Quartz static site generator - which is just as flexible and beginner-friendly as Obsidian - this becomes an elegant system for writing and selectively publishing notes. Right now, this is my top choice. The only thing I miss about Quartz is the creation of multi-lingual versions of the site.

I don’t like the approach to creating a project for linking Obsidian and Quartz repository described in the [official Quartz documentation](https://quartz.jzhao.xyz/#-get-started) very much, because it makes the repository a part of the Quartz project itself and pulls in the entire history of its commits. It is clear that this is quite friendly for beginners and removes all the complexity of working with Git, but for me as a programmer it is terrible.

So we'll be doing Obsidian and Quartz in a more “programmer” style, and publishing the site on Cloudflare Pages, as a more [preferred option for Quartz's limitations](https://quartz.jzhao.xyz/hosting#github-pages) than publishing it on GitHub Pages.

## Deployment Guide: Obsidian + Quartz + Cloudflare Pages

### 0. Directory and File Structure

```bash
. # Root folder (che-dev-blog-src)
├── quartz        # Quartz project folder
│   └── content
│   └── ...
└── che-dev-blog  # Obsidian vault folder
    ├── .obsidian
    ├── ~templates
    │   └── new-note.md
    ├── unsorted
    ├── index.md
    └── ...
```

### 1. Create a GitHub Repository

- Create a new GitHub repository (e.g. `che-dev-blog`)
- Clone it to your local machine:

```bash
git clone https://github.com/your-username/che-dev-blog.git che-dev-blog-src
cd che-dev-blog-src
```

### 2. Add Quartz as a Subtree

Add Quartz (v4 branch) into a quartz/ subfolder:

```bash
git subtree add --prefix=quartz https://github.com/jackyzha0/quartz.git v4 --squash
```

To update later:

```bash
git subtree pull --prefix=quartz https://github.com/jackyzha0/quartz.git v4 --squash
```

### 3. Create an Obsidian Vault

- Inside the project root, create a folder for your Obsidian vault (e.g. `che-dev-blog/`)
- Open Obsidian -> "Open folder as vault" -> select the `che-dev-blog/` folder
- This folder will contain your Markdown notes

Then:

- Configure your preferred community plugins and templates inside the vault
- Create a new note named `index` in the root of the vault - this will be your homepage

### 4. Configure Quartz

1. Delete the entire quartz/content folder (it contains only a .gitkeep):

```bash
rm -rf quartz/content

# Windows:
# rmdir /s /q quartz\content
```

2. Create a symbolic link named quartz/content pointing to your Obsidian vault folder:

```bash
ln -s che-dev-blog quartz/content

# Windows (run as Administrator):
# cmd: mklink /D quartz\content che-dev-blog
# powershell: New-Item -ItemType SymbolicLink -Path "quartz\content" -Target "che-dev-blog"
```

> Make sure you run these commands from the project root and adjust the paths if needed.

### 5. Build the Site and Run in Development Mode

Run the following inside the quartz folder to build the static site and start the development server:

```bash
cd quartz
npx quartz build --serve
```

- The command `npx quartz build` compiles the site and outputs static files ready for deployment into the `quartz/public` folder.
- Adding `--serve` starts a local development server with live reload, useful for previewing changes (default <http://localhost:8080/>).

### 6. Deploy Quartz Site on Cloudflare Pages

#### Pushing Changes to GitHub

Before you start deployment in Cloudflare, make sure all your local changes are committed and pushed:

```bash
git add . && git commit -m "Deploy: update site content and config" && git push origin main
```

#### Deploy on Cloudflare Pages

- Go to <https://dash.cloudflare.com/> and log in to your Cloudflare account.
- In the dashboard sidebar, select Compute (Workers) -> Workers & Pages.
- Click Create application -> Pages -> Connect to Git.
- Select your GitHub repository (for example, `che-dev-blog`).
- In the Set up builds and deployments section, configure these values:

Option | Value
--- | ---
Project name | Specify the domain name you'd like to have before .pages.dev. The project name determines your site's address
Production branch | main
Framework preset | None
Build command | `mkdir -p quartz/content && cp -r che-dev-blog/. quartz/content/ && cd quartz && npm install && npx quartz build`
Build output directory | `quartz/public`

- Press Save and deploy.
Your site will be deployed in about a minute. The site will be available at: <https://chernyavsky.pages.dev>

From now on, every time you push changes to the main branch on GitHub, Cloudflare Pages will rebuild and update your site automatically.

## Links

- [che-dev-blog](https://github.com/pprometey/che-dev-blog) is the source code of this blog project made with Obsidian + Quartz. You can check out the history of the first commits, it shows the step-by-step installation and integration process.
