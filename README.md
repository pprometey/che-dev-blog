# che-dev-blog

Dev blog

## Deployment Guide: Obsidian + Quartz + Cloudflare Pages

### 1. Create a GitHub Repository

- Create a new GitHub repository (e.g. `che-dev-blog`)
- Clone it to your local machine:

```bash
git clone https://github.com/your-username/che-dev-blog.git
cd che-dev-blog
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
- Adding `--serve` starts a local development server with live reload, useful for previewing changes (default http://localhost:8080/).

### 6. Deploy Quartz Site on Cloudflare Pages

### Pushing Changes to GitHub

Before you start deployment in Cloudflare, make sure all your local changes are committed and pushed:

```bash
git add . && git commit -m "Deploy: update site content and config" && git push origin main
```

### Deploy on Cloudflare Pages

- Go to <https://dash.cloudflare.com/> and log in to your Cloudflare account.
- In the dashboard sidebar, select Compute (Workers) -> Workers & Pages.
- Click Create application -> Pages -> Connect to Git.
- Select your GitHub repository (for example, `che-dev-blog`).
- In the Set up builds and deployments section, configure these values: 

Option | Value
--- | ---
Project name | chernyavsky (this will define your site domain: chernyavsky.pages.dev)
Production branch | main
Framework preset | None
Build command | `mkdir -p quartz/content && cp -r che-dev-blog/. quartz/content/ && cd quartz && npm install && npx quartz build`
Build output directory | `quartz/public`

- Press Save and deploy.
Your site will be deployed in about a minute. The site will be available at: <https://chernyavsky.pages.dev>

From now on, every time you push changes to the main branch on GitHub, Cloudflare Pages will rebuild and update your site automatically.
