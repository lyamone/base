import { Component, signal } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../../.storybook/types';
import { IconComponent } from '../icon/icon';
import { DockComponent } from './dock';
import { DockItemContentSlotDirective } from './dock-item-slot.directive';
import { DockItemComponent } from './dock-item';

@Component({
  selector: 'ul-dock-demo',
  standalone: true,
  imports: [DockComponent, DockItemComponent, IconComponent, DockItemContentSlotDirective],
  template: `
    <div style="min-height: 100vh; background: var(--color-background-main, #0a0a0a);">
      <main style="padding: 1.5rem;">
        <p style="color: rgba(255,255,255,0.7);">
          Resize the viewport below 1024px to see the dock — it's hidden by the component's own CSS
          at desktop widths, by design. The "New" item shows a fully custom, projected-content tab
          with the "accent" variant; "Alerts" shows a badge.
        </p>
      </main>
      <ul-dock>
        <ul-dock-item
          icon="home"
          label="Home"
          [active]="active() === 'home'"
          (click)="active.set('home')"
        />
        <ul-dock-item
          icon="search"
          label="Search"
          [active]="active() === 'search'"
          (click)="active.set('search')"
        />
        <ul-dock-item variant="accent" [active]="active() === 'new'" (click)="active.set('new')">
          <span ul-dock-item-content>
            <ul-icon icon="plus" size="6" />
          </span>
        </ul-dock-item>
        <ul-dock-item
          icon="bell_on"
          label="Alerts"
          badge="3"
          [active]="active() === 'alerts'"
          (click)="active.set('alerts')"
        />
        <ul-dock-item
          icon="user"
          label="Profile"
          [active]="active() === 'profile'"
          (click)="active.set('profile')"
        />
      </ul-dock>
    </div>
  `,
})
class DockDemoComponent {
  active = signal('home');
}

const meta: Meta<DockComponent> = {
  title: 'Components/Navigation/Dock',
  component: DockComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "Mobile-only bottom navigation bar (app-style tab bar). Hidden above the 'md' breakpoint (1024px) by the component's own CSS — no wrapper class or media query needed in the consuming app. Project ul-dock-item elements directly (icon + label + active state); there is no data-driven items input, since each item typically needs its own routerLink. Each item supports a badge (unread counts, etc.) and a variant ('default' | 'accent') for a raised/highlighted look, and can fully replace its icon+label with projected content via [ul-dock-item-content] for bespoke tabs. Resize the Storybook viewport below 1024px to see it render.",
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [DockDemoComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<DockComponent>;

export const Default: Story = {
  render: () => ({
    template: `<ul-dock-demo></ul-dock-demo>`,
  }),
};

export const MobileViewport: Story = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const TabletViewport: Story = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
