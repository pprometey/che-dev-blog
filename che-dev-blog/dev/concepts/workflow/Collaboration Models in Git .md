---
title: Collaboration Models in Git 
description: An overview of the two most common collaboration models in Git-based development — Fork + Pull and Shared Repository
lang: en
draft: false
publish: true
tags: ["dev", "workflow", "git"]
created: 2025-07-21 00:09
---

In modern software development, two collaboration models have become the most widely used when working with Git repositories:

## Fork + Pull

This model allows any user to create a personal copy of a repository (a `fork`), make changes in that copy, and then propose those changes to the `maintainer` of the original repository via a `pull request` (PR in GitHub and Gitea, `Merge Request` or MR in GitLab).  
Key points:

- Does not require write access to the main repository.  
- Lowers the barrier for new `contributors`.  
- Ideal for open source projects.  
- Enables independent work without constant coordination with the core team.

## Shared Repository

The `shared repository` model is typically used by teams and organizations, especially when working on private or internal projects. All contributors have direct write access to the same repository.

- Changes are isolated in separate branches, commonly referred to as `topic branches`.  
- Requires more coordination and trust within the team.  
- Well-suited for small and mid-sized teams.  
- Frequently paired with mandatory code review through pull requests.

## The Role of Pull Requests

Pull requests are especially important in the Fork + Pull model, as they serve as the main channel for proposing changes to the core project. However, they are also widely used in the shared repository model — enabling discussion, review, and quality control before merging changes into the main branch.
