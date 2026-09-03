import { Meta, StoryObj } from '../../../.storybook/types';

import { MenuComponent } from './menu';

const meta: Meta<MenuComponent> = {
  title: 'Components/Actions/Menu',
  component: MenuComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Trigger + panel for an action menu (edit, delete, share, ...). Unlike `ul-dropdown`, there is no "currently selected" item — every item is a one-off action, so nothing is ever shown as checked. Pass `items` (label, value, optional leftIcons/rightIcons/disabled) for the common case, and/or project custom content (e.g. a routerLink item) as children. Below the \'md\' breakpoint the panel renders as a bottom sheet instead of a small anchored popover.',
      },
    },
  },
  argTypes: {
    theme: {
      options: ['ghost-white', 'transparent-white'],
      control: 'select',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<MenuComponent>;

/**
 * A "more options" icon-only trigger opening an action menu — the most
 * common use case (e.g. a row of items each with their own edit/delete
 * menu).
 */
export const IconOnlyTrigger: Story = {
  args: {
    items: [
      { label: 'Edit', value: 'edit', leftIcons: ['edit'] },
      { label: 'Delete', value: 'delete', leftIcons: ['trash'] },
    ],
    triggerIconOnly: 'more_options',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 300px">
        <ul-menu [items]="items" [triggerIconOnly]="triggerIconOnly"></ul-menu>
      </div>
    `,
  }),
};

/**
 * A menu with a disabled item.
 */
export const WithDisabledItem: Story = {
  args: {
    items: [
      { label: 'Edit', value: 'edit', leftIcons: ['edit'] },
      { label: 'Delete', value: 'delete', leftIcons: ['trash'], disabled: true },
    ],
    triggerIconOnly: 'more_options',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 300px">
        <ul-menu [items]="items" [triggerIconOnly]="triggerIconOnly"></ul-menu>
      </div>
    `,
  }),
};

/**
 * A labeled (non-icon-only) trigger, for something like a page-level
 * "Bulk actions" button rather than a per-row "⋮" menu.
 */
export const LabeledTrigger: Story = {
  args: {
    items: [
      { label: 'Publish selected', value: 'publish' },
      { label: 'Delete selected', value: 'delete', leftIcons: ['trash'] },
    ],
    triggerLabel: 'Bulk actions',
    triggerRightIcons: ['chevron_down'],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 300px">
        <ul-menu
          [items]="items"
          [triggerLabel]="triggerLabel"
          [triggerRightIcons]="triggerRightIcons">
        </ul-menu>
      </div>
    `,
  }),
};
