import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../../.storybook/types';
import { AvatarComponent } from '../avatar/avatar';
import { IconComponent } from '../icon/icon';
import { SearchSelectComponent } from '../search-select/search-select';

import {
  NavbarAppNameSlotDirective,
  NavbarAvatarSlotDirective,
  NavbarComponent,
  NavbarLogoSlotDirective,
  NavbarSearchSlotDirective,
} from './index';

const meta: Meta<NavbarComponent> = {
  title: 'Components/Navigation/Navbar',
  component: NavbarComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Responsive navbar with logo, optional search, and avatar. Use content projection: [ul-navbar-logo], [ul-navbar-search], [ul-navbar-avatar], [ul-navbar-app-name]. Import the slot directives when using slots so the navbar can detect them. [ul-navbar-app-name] renders next to the default logo image (logoSrc) — it has no effect when a custom [ul-navbar-logo] is projected. On mobile, when search is projected a toggle button shows; on tablet/desktop search is inline. Default logo/avatar can be set via logoHref/logoSrc/logoAlt and avatarSrc/avatarInitials/avatarAlt when slots are not used. Set `variant="minimal"` to show only the logo — no sidebar toggle, search, or avatar — for auth pages and other chromeless flows.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        NavbarComponent,
        SearchSelectComponent,
        IconComponent,
        AvatarComponent,
        NavbarLogoSlotDirective,
        NavbarSearchSlotDirective,
        NavbarAvatarSlotDirective,
        NavbarAppNameSlotDirective,
      ],
    }),
    (story) => ({
      ...story(),
      template: `
        <div style="min-height: 100vh; background: var(--color-background-main, #0a0a0a);">
          ${story().template}
          <main style="padding: 1.5rem; color: rgba(255,255,255,0.7);">
            Resize the viewport to see mobile (search toggle) vs tablet/desktop (inline search).
          </main>
        </div>
      `,
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['full', 'minimal'],
      description: "'full' (default) shows the sidebar toggle, search, and avatar; 'minimal' shows only the logo.",
    },
    logoHref: { control: 'text', description: 'Default logo link when logo slot is not used' },
    logoAlt: { control: 'text' },
    avatarInitials: { control: 'text', description: 'Default avatar initials when avatar slot is not used' },
  },
};

export default meta;
type Story = StoryObj<NavbarComponent>;

export const Default: Story = {
  args: {
    logoHref: '/',
    logoAlt: 'Home',
    avatarInitials: 'JD',
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-navbar
        [logoHref]="logoHref"
        [logoAlt]="logoAlt"
        [avatarInitials]="avatarInitials"
      >
        <a ul-navbar-logo href="/" style="font-weight: 700; color: inherit; text-decoration: none;">UNDERLAYER</a>
        <div ul-navbar-search>
          <ul-search-select
            placeholder="Search..." 
            [options]="[
              { label: 'Apple', value: 'apple' },
              { label: 'Banana', value: 'banana' },
              { label: 'Cherry', value: 'cherry' },
            ]"
            size="md"
          />
        </div>
        <ul-avatar ul-navbar-avatar initials="JD" size="md" />
      </ul-navbar>
    `,
  }),
};

export const WithDefaultLogoAndAvatar: Story = {
  args: {
    logoHref: '/',
    logoSrc: 'assets/img/logo.png',
    logoAlt: 'Underlayer logo',
    avatarInitials: 'AB',
    avatarAlt: 'User',
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-navbar
        [logoHref]="logoHref"
        [logoSrc]="logoSrc"
        [logoAlt]="logoAlt"
        [avatarInitials]="avatarInitials"
        [avatarAlt]="avatarAlt"
      >
        <span ul-navbar-app-name>Underlayer</span>
      </ul-navbar>
    `,
  }),
};

export const WithoutSearch: Story = {
  args: {
    logoHref: '/',
    avatarInitials: 'U',
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-navbar
        [logoHref]="logoHref"
        [avatarInitials]="avatarInitials"
      >
                <ul-avatar ul-navbar-avatar initials="U" size="md" />
      </ul-navbar>
    `,
  }),
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    logoHref: '/',
    logoSrc: 'assets/img/logo.png',
    logoAlt: 'Underlayer logo',
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-navbar
        [variant]="variant"
        [logoHref]="logoHref"
        [logoSrc]="logoSrc"
        [logoAlt]="logoAlt"
      />
    `,
  }),
};

export const MobileViewport: Story = {
  ...Default,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

export const TabletViewport: Story = {
  ...Default,
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
};
