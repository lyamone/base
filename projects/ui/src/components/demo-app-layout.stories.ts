import { Component, input, model, signal } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../.storybook/types';
import { AvatarComponent } from './avatar/avatar';
import {
  NavbarAvatarSlotDirective,
  NavbarComponent,
  NavbarLogoSlotDirective,
  NavbarSearchSlotDirective,
} from './navbar/index';
import { SearchSelectComponent } from './search-select/search-select';
import { SidebarComponent, SidebarItem } from './sidebar/sidebar';

const defaultSidebarItems: SidebarItem[] = [
  { label: 'Home', leftIcons: ['home'], value: 'home' },
  { label: 'Library', leftIcons: ['library'], value: 'library' },
  { label: 'Store', leftIcons: ['store'], value: 'store' },
  { label: 'Wallet', leftIcons: ['wallet'], value: 'wallet' },
  { label: 'Settings', leftIcons: ['settings'], value: 'settings', rightIcons: ['chevron_right'] },
];

const searchOptions = [
  { label: 'Chrono Nexus', value: 'chrono-nexus' },
  { label: 'Adventure Quest', value: 'adventure-quest' },
  { label: 'Space Racer', value: 'space-racer' },
  { label: 'Puzzle Master', value: 'puzzle-master' },
];

@Component({
  selector: 'ul-demo-app-layout',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  template: `
    <div class="ul-demo-app-layout">
      <ul-sidebar
        [items]="sidebarItems()"
        [theme]="sidebarTheme()"
        [selectedIndex]="selectedIndex()"
        [(open)]="sidebarOpen"
        (itemSelected)="onItemSelected($event)">
      </ul-sidebar>
      <div class="ul-demo-app-layout__body">
        <header class="ul-demo-app-layout__navbar">
          <ul-navbar
            logoHref="/"
            [avatarInitials]="avatarInitials()"
            [sidebarOpen]="sidebarOpen()"
            [showSidebarToggle]="true"
            (sidebarToggle)="onSidebarToggle()">
            <ng-content select="[ul-navbar-logo]" />
            <ng-content select="[ul-navbar-search]" />
            <ng-content select="[ul-navbar-avatar]" />
          </ul-navbar>
        </header>
        <main class="ul-demo-app-layout__main">
          <ng-content />
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      .ul-demo-app-layout {
        display: flex;
        min-height: 100vh;
        background: #0a0a0a;
      }
      .ul-demo-app-layout__body {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .ul-demo-app-layout__navbar {
        flex-shrink: 0;
      }
      .ul-demo-app-layout__main {
        flex: 1;
        padding: 1.5rem 2rem;
        overflow: auto;
      }
    `,
  ],
})
export class DemoAppLayoutComponent {
  sidebarItems = input<SidebarItem[]>(defaultSidebarItems);
  sidebarTheme = input<'ghost-white' | 'transparent-white' | 'outline-white' | 'outline-purple'>('ghost-white');
  avatarInitials = input<string>('JD');

  readonly sidebarOpen = model<boolean>(false);
  readonly selectedIndex = signal(0);

  onSidebarToggle(): void {
    this.sidebarOpen.update((v) => !v);
  }

  onItemSelected(item: SidebarItem): void {
    const items = this.sidebarItems();
    const idx = items.findIndex((i) => i.value === item.value);
    if (idx >= 0) {
      this.selectedIndex.set(idx);
    }
  }
}

@Component({
  selector: 'ul-demo-app-layout-story',
  standalone: true,
  imports: [
    DemoAppLayoutComponent,
    NavbarLogoSlotDirective,
    NavbarSearchSlotDirective,
    NavbarAvatarSlotDirective,
    SearchSelectComponent,
    AvatarComponent,
  ],
  template: `
    <ul-demo-app-layout>
      <a ul-navbar-logo href="/" class="ul-text-primary ul-typography-brand-headline-m-extrablack">
        Perpetua
      </a>
      <div ul-navbar-search>
        <ul-search-select placeholder="Search games..." [options]="searchOptions" size="md" />
      </div>
      <ul-avatar ul-navbar-avatar initials="JD" size="md" />

      <div class="ul-demo-app-layout-story__content">
        <h1 class="ul-demo-app-layout-story__title">App Layout Demo</h1>
        <p class="ul-demo-app-layout-story__desc">
          This layout coordinates the navbar and sidebar. On mobile, use the hamburger menu in the navbar
          to open the sidebar drawer. On desktop, the sidebar stays visible.
        </p>
        <p class="ul-demo-app-layout-story__hint">
          Resize the viewport to mobile width to see the toggle behavior.
        </p>
      </div>
    </ul-demo-app-layout>
  `,
  styles: [
    `
      .ul-demo-app-layout-story__content {
        max-width: 560px;
      }
      .ul-demo-app-layout-story__title {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 1rem 0;
      }
      .ul-demo-app-layout-story__desc,
      .ul-demo-app-layout-story__hint {
        color: rgba(255, 255, 255, 0.7);
        font-size: 1rem;
        line-height: 1.5;
        margin: 0 0 0.75rem 0;
      }
      .ul-demo-app-layout-story__hint {
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.5);
      }
    `,
  ],
})
class DemoAppLayoutStoryComponent {
  searchOptions = searchOptions;
}

const meta: Meta<DemoAppLayoutComponent> = {
  title: 'Demos/App layout',
  component: DemoAppLayoutComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Reusable app shell that coordinates the navbar toggle button with the sidebar. The parent owns the sidebar open state; clicking the hamburger menu in the navbar toggles the sidebar drawer on mobile.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        DemoAppLayoutComponent,
        NavbarComponent,
        NavbarLogoSlotDirective,
        NavbarSearchSlotDirective,
        NavbarAvatarSlotDirective,
        SidebarComponent,
        SearchSelectComponent,
        AvatarComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<DemoAppLayoutComponent>;

export const Default: Story = {
  render: () => ({
    template: '<ul-demo-app-layout-story></ul-demo-app-layout-story>',
    moduleMetadata: {
      imports: [DemoAppLayoutStoryComponent],
    },
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
