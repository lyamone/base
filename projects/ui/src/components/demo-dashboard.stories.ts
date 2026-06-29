import { Component, signal } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../.storybook/types';
import { AvatarComponent } from './avatar/avatar';
import { ButtonComponent } from './button/button';
import { CardComponent } from './card/card';
import { DemoAppLayoutComponent } from './demo-app-layout.stories';
import { IconComponent } from './icon/icon';
import {
  NavbarAvatarSlotDirective,
  NavbarLogoSlotDirective,
} from './navbar/index';
import { ListItemComponent } from './list-item/list-item';
import { RadialComponent } from './radial/radial';
import { SidebarComponent, SidebarItem } from './sidebar/sidebar';
import { StatusComponent } from './status/status';

const sidebarItems: SidebarItem[] = [
  { label: 'Home', leftIcons: ['home'], value: 'home' },
  { label: 'Library', leftIcons: ['library'], value: 'library' },
  { label: 'Store', leftIcons: ['store'], value: 'store' },
  { label: 'Wallet', leftIcons: ['wallet'], value: 'wallet' },
  { label: 'Settings', leftIcons: ['settings'], value: 'settings', rightIcons: ['chevron_right'] },
];

@Component({
  selector: 'ul-demo-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    CardComponent,
    ButtonComponent,
    RadialComponent,
    StatusComponent,
    IconComponent,
    ListItemComponent,
  ],
  template: `
    <div class="ul-demo-dashboard">
      <ul-sidebar
        [items]="sidebarItems"
        theme="ghost-white"
        [selectedIndex]="selectedIndex()"
        (itemSelected)="onItemSelected($event)">
      </ul-sidebar>
      <main class="ul-demo-dashboard__main">
        <h1 class="ul-demo-dashboard__title">Dashboard</h1>
        <div class="ul-demo-dashboard__grid">
          <ul-card
            cardCaption="Storage"
            cardTitle="75% used"
            cardSubtitle="12.4 GB of 16 GB">
            <div udsCardFooter class="ul-demo-dashboard__card-footer">
              <ul-radial size="48" [percentage]="75" ariaLabel="Storage 75%" />
              <ul-button theme="ghost-white">View</ul-button>
            </div>
          </ul-card>
          <ul-card
            cardCaption="Status"
            cardTitle="Active"
            cardSubtitle="All systems operational">
            <div udsCardFooter class="ul-demo-dashboard__card-footer">
              <ul-status status="confirm">
                <span ul-status-title>Running</span>
              </ul-status>
              <ul-button theme="ghost-white">Details</ul-button>
            </div>
          </ul-card>
          <ul-card
            cardCaption="Tasks"
            cardTitle="8 of 10 complete"
            cardSubtitle="2 pending">
            <div udsCardFooter class="ul-demo-dashboard__card-footer">
              <ul-radial size="48" [percentage]="80" ariaLabel="Tasks 80%" />
              <ul-button theme="fill-purple">Continue</ul-button>
            </div>
          </ul-card>
          <ul-card
            cardCaption="Alerts"
            cardTitle="1 pending"
            cardSubtitle="Review required">
            <div udsCardFooter class="ul-demo-dashboard__card-footer">
              <ul-status status="alert">
                <span ul-status-title>Action needed</span>
              </ul-status>
              <ul-button theme="ghost-white">Review</ul-button>
            </div>
          </ul-card>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      .ul-demo-dashboard {
        display: flex;
        min-height: 100vh;
      }
      .ul-demo-dashboard__main {
        flex: 1;
        padding: 1.5rem 2rem;
        background: #0a0a0a;
        overflow: auto;
      }
      .ul-demo-dashboard__title {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 1.5rem 0;
      }
      .ul-demo-dashboard__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1rem;
      }
      .ul-demo-dashboard__grid ul-card {
        display: block;
      }
      .ul-demo-dashboard__card-footer {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
    `,
  ],
})
class DemoDashboardComponent {
  sidebarItems = sidebarItems;
  selectedIndex = signal(0);

  onItemSelected(item: SidebarItem): void {
    const idx = sidebarItems.findIndex((i) => i.value === item.value);
    if (idx >= 0) {
      this.selectedIndex.set(idx);
    }
  }
}

@Component({
  selector: 'ul-demo-dashboard-with-layout',
  standalone: true,
  imports: [
    DemoAppLayoutComponent,
    NavbarLogoSlotDirective,
    NavbarAvatarSlotDirective,
    SidebarComponent,
    CardComponent,
    ButtonComponent,
    RadialComponent,
    StatusComponent,
    IconComponent,
    ListItemComponent,
    AvatarComponent,
  ],
  template: `
    <ul-demo-app-layout [sidebarItems]="sidebarItems">
      <a ul-navbar-logo href="/" class="ul-text-primary" style="font-weight: 700; color: inherit; text-decoration: none;">
        Player Eleven
      </a>
      <ul-avatar ul-navbar-avatar initials="JD" size="md" />

      <h1 class="ul-demo-dashboard__title">Dashboard</h1>
      <div class="ul-demo-dashboard__grid">
        <ul-card
          cardCaption="Storage"
          cardTitle="75% used"
          cardSubtitle="12.4 GB of 16 GB">
          <div udsCardFooter class="ul-demo-dashboard__card-footer">
            <ul-radial size="48" [percentage]="75" ariaLabel="Storage 75%" />
            <ul-button theme="ghost-white">View</ul-button>
          </div>
        </ul-card>
        <ul-card
          cardCaption="Status"
          cardTitle="Active"
          cardSubtitle="All systems operational">
          <div udsCardFooter class="ul-demo-dashboard__card-footer">
            <ul-status status="confirm">
              <span ul-status-title>Running</span>
            </ul-status>
            <ul-button theme="ghost-white">Details</ul-button>
          </div>
        </ul-card>
        <ul-card
          cardCaption="Tasks"
          cardTitle="8 of 10 complete"
          cardSubtitle="2 pending">
          <div udsCardFooter class="ul-demo-dashboard__card-footer">
            <ul-radial size="48" [percentage]="80" ariaLabel="Tasks 80%" />
            <ul-button theme="fill-purple">Continue</ul-button>
          </div>
        </ul-card>
        <ul-card
          cardCaption="Alerts"
          cardTitle="1 pending"
          cardSubtitle="Review required">
          <div udsCardFooter class="ul-demo-dashboard__card-footer">
            <ul-status status="alert">
              <span ul-status-title>Action needed</span>
            </ul-status>
            <ul-button theme="ghost-white">Review</ul-button>
          </div>
        </ul-card>
      </div>
    </ul-demo-app-layout>
  `,
  styles: [
    `
      .ul-demo-dashboard__title {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 1.5rem 0;
      }
      .ul-demo-dashboard__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1rem;
      }
      .ul-demo-dashboard__grid ul-card {
        display: block;
      }
      .ul-demo-dashboard__card-footer {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
    `,
  ],
})
class DemoDashboardWithLayoutComponent {
  sidebarItems = sidebarItems;
}

const meta: Meta<DemoDashboardComponent> = {
  title: 'Demos/Dashboard',
  component: DemoDashboardComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'App shell with sidebar navigation and a grid of KPI-style cards using Radial and Status.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        SidebarComponent,
        CardComponent,
        ButtonComponent,
        RadialComponent,
        StatusComponent,
        IconComponent,
        ListItemComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<DemoDashboardComponent>;

export const Default: Story = {
  render: () => ({
    template: '<ul-demo-dashboard></ul-demo-dashboard>',
    moduleMetadata: {
      imports: [DemoDashboardComponent],
    },
  }),
};

export const WithAppLayout: Story = {
  render: () => ({
    template: '<ul-demo-dashboard-with-layout></ul-demo-dashboard-with-layout>',
    moduleMetadata: {
      imports: [DemoDashboardWithLayoutComponent],
    },
  }),
};
