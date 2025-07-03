# che-dev-blog

Dev blog

## Deployment Guide: Obsidian + Quartz + Github Pages

### Create a GitHub Repository

- Create a new GitHub repository (e.g. `che-dev-blog`)
- Clone it to your local machine:

```bash
git clone https://github.com/your-username/che-dev-blog.git
cd che-dev-blog
```

### Add Quartz as a Subtree

Add Quartz (v4 branch) into a quartz/ subfolder:

```bash
git subtree add --prefix=quartz https://github.com/jackyzha0/quartz.git v4 --squash
```

To update later:

```bash
git subtree pull --prefix=quartz https://github.com/jackyzha0/quartz.git v4 --squash
```
