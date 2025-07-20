---
title: Definition of Done (DoD)
description: A set of mandatory conditions that must be met for a task to be considered complete and ready for delivery. Ensures a shared understanding of quality and completeness within the team
lang: en
draft: false
publish: true
tags: ["Scrum", "Agile", "DoD", "Definition of Done", "workflow", "dev"]
created: 2025-07-19 19:19
---

**Definition of Done** is a set of criteria that a task must meet to be considered fully completed. When a developer says "Done" (or "finished", "completed", "implemented"), they guarantee the following:

### 1. Code has been reviewed

- Code was reviewed by at least one other developer.
- It follows general and project-specific code review standards.

### 2. Code is deployed to a test environment

- The feature is available in an environment as close to production as possible.
- QA, designers, PO, and others can test it.

### 3. Feature has been tested

- Automated tests are written and passed.
- Manual testing has been performed if needed.

### 4. Regression testing is complete

- Other parts of the system potentially affected have been verified to work properly.

### 5. Documentation is updated

- Technical documentation and diagrams are updated.
- User-facing features are documented in the user guide.
- Operational documentation (deployment, migrations, upgrades) is updated.

### 6.  [[Definition of Ready (DoR)|Acceptance criteria]] are fulfilled

- The feature has been approved by the Product Owner.
- Any UI changes made during development have been reviewed by the UX designer.

### 7. Deployed to Production

- The functionality is available to end users.

### 8. Logging and monitoring are in place

- Logs, metrics, and alerts are added according to team standards.
