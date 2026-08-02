import { Component, signal } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../../.storybook/types';
import { DockComponent } from './dock';
import { DockItemComponent } from './dock-item';

type DockDemoItem = { icon: string; label: string };

const DEMO_ITEMS: DockDemoItem[] = [
  { icon: 'home', label: 'Home' },
  { icon: 'search', label: 'Search' },
  { icon: 'plus', label: 'New' },
  { icon: 'user', label: 'Profile' },
  { icon: 'settings', label: 'Settings' },
];

@Component({
  selector: 'ul-dock-demo',
  standalone: true,
  imports: [DockComponent, DockItemComponent],
  template: `
    <div style="min-height: 100vh; background: var(--color-background-main, #0a0a0a);">
      <main style="padding: 1.5rem;">
        <p style="color: rgba(255,255,255,0.7);">
          Resize the viewport below 1024px to see the dock — it's hidden by
          the component's own CSS at desktop widths, by design.
        </p>
      </main>
      <ul-dock>
        @for (item of items; track item.icon) {
          <ul-dock-item
            [icon]="item.icon"
            [label]="item.label"
            [active]="active() === item.icon"
            (click)="active.set(item.icon)"
          />
        }
      </ul-dock>
    </div>
  `,
})
class DockDemoComponent {
  items = DEMO_ITEMS;
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
          "Mobile-only bottom navigation bar (app-style tab bar). Hidden above the 'md' breakpoint (1024px) by the component's own CSS — no wrapper class or media query needed in the consuming app. Project ul-dock-item elements directly (icon + label + active state); there is no data-driven items input, since each item typically needs its own routerLink. Resize the Storybook viewport below 1024px to see it render.",
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
