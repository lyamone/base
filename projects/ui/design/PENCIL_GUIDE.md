# Pencil Design-to-Code Guide

Reference for AI-assisted code generation from Pencil designs. Use this guide when prompting Cmd/Ctrl + K to generate Angular 21+ components that match the `projects/ui` library.

---

## Library Path

- **UI library:** `projects/ui` (relative to workspace root `base`)
- **Design tokens:** `projects/ui/src/design-tokens/variables.css`
- **Full tokens (all variables):** `projects/ui/src/design-tokens/variables.css`
- **Lightweight re-export:** `projects/ui/design/tokens-for-pencil.css` (@import of variables.css)

---

## Component → Class Mapping

### Button (`ul-button` / `ul-btn`)

**Usage:** `<ul-button size="md" theme="fill-purple">Primary Action</ul-button>`

| Prop | Values | Maps to Class |
|------|--------|----------------|
| `size` | `sm`, `md`, `lg`, `xl` | `ul-btn--sm`, `ul-btn--md`, `ul-btn--lg`, `ul-btn--xl` |
| `theme` | See below | `ul-btn--fill-purple`, etc. |
| `iconOnly` | `true` | `ul-btn--icon-only` |
| `vertical` | `true` (lg only) | `ul-btn--vertical` |

**Theme values:** `fill-purple`, `fill-white`, `fill-yellow`, `fill-red`, `transparent-purple`, `transparent-white`, `transparent-red`, `transparent-black`, `ghost-purple`, `ghost-white`, `ghost-red`, `ghost-green`, `outline-white`, `outline-purple`, `outline-red`, `outline-green`

### Card (`ul-card`)

**Usage:**
```html
<ul-card
  cardCaption="Caption"
  cardTitle="Title"
  cardSubtitle="Subtitle">
  <div udsCardMedia>...</div>
  <div udsCardMediaOverlay>...</div>
  <div udsCardMediaAction>...</div>
  <ng-container udsCardFooter>...</ng-container>
</ul-card>
```

| Input | Values | Notes |
|-------|--------|-------|
| `cardCaption`, `cardTitle`, `cardSubtitle` | string | Content |
| `cardDirection` | `horizontal` \| `vertical` | `ul-card--horizontal` |
| `mediaAspectRatio` | `default` \| `square` \| `portrait` | Media shape |
| `footerDist` | `default` \| `equal` | Footer layout |
| `focused`, `disabled` | boolean | State classes |

**Slots:** `udsCardMedia`, `udsCardMediaOverlay`, `udsCardMediaAction`, `udsCardFooter`

### Input (`ul-input`)

**Usage:**
```html
<ul-input
  label="Email"
  placeholder="Enter your email"
  [value]="email()"
  (valueChange)="email.set($event)">
</ul-input>
```

| Input | Values | Notes |
|-------|--------|-------|
| `size` | `sm`, `md`, `lg` | `ul-input--sm`, etc. |
| `appearance` | `border-only` \| `subtle-tint` | Hover style |
| `error`, `disabled`, `readOnly` | boolean | State classes |
| `label`, `placeholder`, `helperText` | string | Labels |
| `type` | `text` \| `email` \| `password` | Input type |

**Projected content:** `[ul-input-left-elements]`, `[ul-input-right-elements]`

### Form Field Label / Helper

- `ul-form-field-label` (internal)
- `ul-form-field-helper` (internal)

### Navbar (`ul-navbar`)

**Usage:**
```html
<ul-navbar
  logoHref="/"
  [logoSrc]="logoUrl"
  [avatarSrc]="avatarUrl"
  [avatarInitials]="'JD'">
  <ng-container *peNavbarLogo>...</ng-container>
  <ng-container *peNavbarSearch>...</ng-container>
  <ng-container *peNavbarAvatar>...</ng-container>
</ul-navbar>
```

### Other Components

| Component | Selector | Import Path |
|-----------|----------|-------------|
| Avatar | `ul-avatar` | `@base/ui` |
| Breadcrumb | `ul-breadcrumb` | `@base/ui` |
| Calendar | `ul-calendar` | `@base/ui` |
| Checkbox | `ul-checkbox` | `@base/ui` |
| Collapse | `ul-collapse` | `@base/ui` |
| Dropdown | `ul-dropdown` | `@base/ui` |
| Footer | `ul-footer` | `@base/ui` |
| Hero | `ul-hero` | `@base/ui` |
| Icon | `ul-icon` | `@base/ui` |
| Modal | `ul-modal` | `@base/ui` |
| Pill | `ul-pill` | `@base/ui` |
| Radio | `ul-radio`, `ul-radio-group` | `@base/ui` |
| Select | `ul-select` | `@base/ui` |
| SearchSelect | `ul-search-select` | `@base/ui` |
| Sidebar | `ul-sidebar` | `@base/ui` |
| Status | `ul-status` | `@base/ui` |
| Table | `ul-table` | `@base/ui` |
| Textarea | `ul-textarea` | `@base/ui` |

---

## Typography Classes

| Class | Use |
|-------|-----|
| `ul-typography-headline-s-extrabold` | 24px, headings |
| `ul-typography-headline-m-extrabold` | 28px |
| `ul-typography-headline-l-regular` | 32px |
| `ul-typography-body-m-regular` | 16px body |
| `ul-typography-body-l-regular` | 18px |
| `ul-typography-caption-l-regular` | 14px labels |
| `ul-typography-caption-mono-regular` | 14px mono |

**Weight variants:** `regular`, `medium`, `extrabold`, `extrablack`

---

## Utility Classes

| Category | Pattern | Example |
|----------|---------|---------|
| Text color | `ul-text-{color}` | `ul-text-primary`, `ul-text-tertiary` |
| Background | `ul-bg-{color}` | `ul-bg-main`, `ul-bg-grey-lvl-1`, `ul-bg-purple` |
| Border | `ul-border-{color}` | `ul-border-white-light` |
| Radius | `ul-rounded-{size}` | `ul-rounded-2`, `ul-rounded-3` |
| Spacing | `ul-p-{n}`, `ul-m-{n}`, `ul-gap-{n}` | `ul-p-4`, `ul-gap-4`, `ul-mb-4` |
| Shadow | `ul-shadow-sm`, `ul-shadow-md` | |

**Spacing scale:** 1 (4px), 2 (8px), 3 (12px), 4 (16px), 6 (24px), 8 (32px)  
**Radius scale:** 1 (4px), 2 (8px), 3 (12px), 4 (16px)

---

## Angular Code Generation Prompts

Use these when generating code from Pencil designs:

**Component:**
```
Generate an Angular standalone component for this design. Use the ui library at projects/ui. Import components from @base/ui (ul-button, ul-card, ul-input). Use SCSS with design tokens from projects/ui/src/design-tokens/variables.css. Apply ul-typography-*, ul-bg-*, ul-rounded-* classes where appropriate.
```

**Page:**
```
Create an Angular page from this Pencil frame. Use components from projects/ui: ul-card, ul-button, ul-navbar, ul-input. Follow patterns in projects/ui/src/components. Use the ul- prefix for all utility classes. Import from @base/ui.
```

**Full token import (all 800+ variables):**
```
Create Pencil variables from projects/ui/src/design-tokens/variables.css
```

**Lightweight import (tokens-for-pencil.css uses @import; if Pencil resolves it, you get all vars):**
```
Create Pencil variables from projects/ui/design/tokens-for-pencil.css
```

---

## Slot Selectors Reference

| Component | Slot Attribute | Purpose |
|-----------|----------------|---------|
| `ul-card` | `udsCardMedia` | Main media (image, etc.) |
| `ul-card` | `udsCardMediaOverlay` | Overlay on media |
| `ul-card` | `udsCardMediaAction` | Action button on media |
| `ul-card` | `udsCardFooter` | Footer actions |
| `ul-input` | `ul-input-left-elements` | Left slot |
| `ul-input` | `ul-input-right-elements` | Right slot |

---

## Workflow

### 1. Token Sync (Code → Pencil)

When design tokens change in `variables.css`:

1. Update `design/tokens-for-pencil.css` if you added new semantic tokens.
2. In Pencil, open `design-system.pen` and press **Cmd/Ctrl + K**.
3. Prompt: *"Create Pencil variables from projects/ui/src/design-tokens/variables.css"* (or use `tokens-for-pencil.css` if you prefer the design folder path)
4. Save the .pen file.

### 2. New Component Import (Code → Pencil)

When you add a new component to `projects/ui`:

1. Open `design/design-system.pen`.
2. Press **Cmd/Ctrl + K**.
3. Prompt: *"Recreate the [ComponentName] component from projects/ui/src/components/[component]"*
4. Review the result, convert to reusable symbol (Cmd+Option+K) if needed.

### 3. Design Tweak → Code (Pencil → Code)

When you change a design in Pencil:

1. Select the frame/component.
2. Press **Cmd/Ctrl + K**.
3. Prompt: *"Update projects/ui/src/components/[component]/[component].ts and [component].scss with this design"*
4. Review the diff and apply.

### 4. New Page (Design First)

1. Design the page in Pencil using component symbols from the design system.
2. Select the page frame.
3. Press **Cmd/Ctrl + K**.
4. Prompt: *"Generate an Angular standalone component for this design. Use projects/ui library. Import ul-card, ul-button, ul-navbar, ul-input from @base/ui. Use SCSS with tokens. See design/PENCIL_GUIDE.md for component mapping."*
5. Save to your app (e.g. `src/app/pages/my-page/`).

### 5. Sync Checklist

| Change type | Where to update | Then |
|-------------|-----------------|------|
| New color/token | `variables.css` or token source | Re-import into Pencil from `tokens-for-pencil.css` |
| New component | `projects/ui` | Import into Pencil via AI prompt |
| Design tweak in Pencil | Pencil canvas | "Update [Component].ts and [Component].scss with this design" |
| New page | Design in Pencil first | Generate Angular component with Cmd+K |
