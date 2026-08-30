---
name: ui-dev
description: Development rules for the @underlayerdev/ui library (Angular 22 component library). Use it whenever code is created or modified under projects/ui.
when_to_use: When writing, generating, or reviewing any file inside projects/ui of this repo (components, directives, stories, styles, tests).
---

# @underlayerdev/ui — development rules

## Angular — version and style

- Angular 22 — `standalone: true` and `changeDetection: ChangeDetectionStrategy.OnPush` are both the default for every component now. **Never write them explicitly** in a `@Component` decorator (new or edited) — they're implicit noise. No `NgModule`.
- Native control-flow syntax (`@if`, `@for`, `@switch`) — never `*ngIf`/`*ngFor`.
- `inject()` instead of constructor injection.
