---
title: Definition of Ready (DoR)
description: Definition of Ready (DoR) is a set of criteria that a task must meet before a developer begins implementation
lang: en
draft: false
publish: true
tags: ["Scrum", "Agile", "DoR", "Definition of Ready", "workflow", "dev"] 
created: 2025-07-19 19:19
---

**Definition of Ready (DoR)** is a set of criteria that it is recommended to meet when defining a task before handing it over to a developer for implementation.

DoR helps to:

- avoid ambiguity in requirements  
- reduce rework during development  
- speed up delivery and prevent  [[Analysis paralysis|analysis paralysis]]
- make planning more accurate and predictable  
- improve the overall quality of the final result

## Core DoR Criteria

### 1. Acceptance Criteria

Answers the question: **What must be implemented for the task to be considered complete?**

- Verifiable, specific, and behavior-oriented: “User can do X”, “System must not do Y”
- Includes both positive and negative scenarios
- Written in behavioral terms; focuses on outcomes, not implementation
- Supports writing manual and automated tests
- May include non-functional requirements (performance, scalability, etc.)

**Examples:**

- Bad: *“Make it convenient”*  
- Good: *“User can change password without reloading the page”*

**Tip:** Use [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) (Given-When-Then) to describe behavior in scenarios.

```yaml
Feature: Backup  
Scenario: Only selected folders  
Given: Folders A and B exist  
When: I exclude B from the backup  
And: I start the process  
Then: Only folder A is saved
```

### 2. Business Value

- Why is this task needed? What problem does it solve? Who is the end user?
- Helps prioritize, especially with limited resources
- Preferably names the business owner or someone who can clarify the value
- Considers client commitments, deadlines, and stakeholder interests

**Tip:** Use the User Story format to express business context:
“As a \[role], I want to \[action], so that \[goal]”

**Example:**
"As a content manager, I want to see the moderation status so I can quickly review new materials."

### 3. Specifications

Answers the question: **How should the behavior described in the acceptance criteria look and work?**

- Includes mockups, UX flows, APIs, display rules, edge cases, diagrams
- Must be clear and agreed upon with the team
- Ideas for implementation should be noted separately as comments—not replace specs

Understanding the difference:

- Acceptance Criteria = **what** to build
- Specifications = **how** it should look and behave

**Example:**

Acceptance Criterion:

- “User can change password without reloading the page.”

Specification:

- Figma mockup of the password change form
- POST `/user/password` with `{ old_password, new_password }`
- Validation messages: “Password must be at least 8 characters”
- After password change: force logout from all sessions

### 4. Work Estimation

Work estimation assesses complexity, not precise duration in hours or minutes.

- Typically done in story points or a virtual scale (e.g., 1–10)
- Covers all stages from DoR to [[Definition of Done (DoD)|DoD]]: development, testing, documentation
- It's an approximation, not a commitment; update estimates if the task changes

### 5. For Bugs and Research Tasks

**Bugs:**

- Description of *expected* vs *actual* behavior
- Steps to reproduce
- Screenshots, logs, errors

**Estimation:**

- If the bug is clear—give an estimate
- If not—use timeboxing:
  *“We'll investigate the bug for 2 days. If unresolved, we’ll reassess the priority”*

**Tip:** One bug — one ticket. Link related bugs if needed.

### 6. Constraints and Conditions

- Technical: *“Only works on PostgreSQL 12”*
- Organizational: *“Cannot add new dependencies”*
- Product-related: *“Only for users in Kazakhstan”*

**Tip:** Anything that might affect implementation should be explicitly stated upfront—especially if developers or analysts may rotate.

## Suggested Task Template Structure

- Description
- Priority
- Expected and actual behavior (for bugs)
- Steps to reproduce (for bugs)
- Personas / User Story
- Initial solution proposal
- Mockups / Design
- Acceptance Criteria
- Work Estimation
- Test Plan
- Points of Contact
