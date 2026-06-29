import { Meta, StoryObj } from '../../../.storybook/types';

const meta: Meta = {
  title: 'Foundations/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Design system color palette. Background (`.ul-bg-*`), text (`.ul-text-*`), and border utilities for main, grey levels, white, black, and semantic colors.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const BackgroundColors: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4">
        <h2 class="ul-typography-headline-l-regular">Background Colors</h2>
        
        <div class="ul-gap-4" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
          <div *ngFor="let color of colors" class="ul-p-4">
            <div [class]="color.class" class="ul-p-8 ul-rounded-2">
              <p class="ul-typography-body-m-regular">{{color.name}}</p>
              <code>.{{color.class}}</code>
            </div>
          </div>
        </div>
      </div>
    `,
    props: {
      colors: [
        { name: 'Main', class: 'ul-bg-main' },
        { name: 'Grey Level 1', class: 'ul-bg-grey-lvl-1' },
        { name: 'Grey Level 2', class: 'ul-bg-grey-lvl-2' },
        { name: 'White Light', class: 'ul-bg-white-light' },
        { name: 'Black Strong', class: 'ul-bg-black-strong' },
        { name: 'Black Medium', class: 'ul-bg-black-medium' },
        { name: 'White Extra Light', class: 'ul-bg-white-extra-light' },
        { name: 'Main Strong', class: 'ul-bg-main-strong' },
        { name: 'Purple', class: 'ul-bg-purple' },
        { name: 'Purple Light', class: 'ul-bg-purple-light' },
        { name: 'White', class: 'ul-bg-white' },
        { name: 'White Medium Strong', class: 'ul-bg-white-medium-strong' },
        { name: 'Green Light', class: 'ul-bg-green-light' },
        { name: 'Green', class: 'ul-bg-green' },
        { name: 'Red Light', class: 'ul-bg-red-light' },
        { name: 'Red', class: 'ul-bg-red' },
        { name: 'Orange Light', class: 'ul-bg-orange-light' },
        { name: 'Orange', class: 'ul-bg-orange' },
        { name: 'White Medium Light', class: 'ul-bg-white-medium-light' },
      ],
    },
  }),
};

export const TextColors: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4">
        <h2 class="ul-typography-headline-l-regular">Text Colors</h2>
        
        <div class="ul-gap-4" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
          <div *ngFor="let color of colors" class="ul-p-4">
            <div class="ul-bg-grey-lvl-1 ul-p-8 ul-rounded-2">
              <p [class]="color.class" class="ul-typography-body-m-regular">{{color.name}}</p>
              <code>.{{color.class}}</code>
            </div>
          </div>
        </div>
      </div>
    `,
    props: {
      colors: [
        { name: 'Primary', class: 'ul-text-primary' },
        { name: 'Secondary', class: 'ul-text-secondary' },
        { name: 'Tertiary', class: 'ul-text-tertiary' },
        { name: 'Disabled', class: 'ul-text-disabled' },
        { name: 'Purple', class: 'ul-text-purple' },
        { name: 'Green', class: 'ul-text-green' },
        { name: 'Red', class: 'ul-text-red' },
        { name: 'Orange', class: 'ul-text-orange' },
        { name: 'Yellow', class: 'ul-text-yellow' },
        { name: 'Inverted', class: 'ul-text-inverted' },
        { name: 'Purple Inverted', class: 'ul-text-purple-inverted' },
        { name: 'Inverted Strong', class: 'ul-text-inverted-strong' },
      ],
    },
  }),
};

export const InteractiveColors: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4">
        <h2 class="ul-typography-headline-l-regular">Interactive Surface Colors</h2>
        
        <div class="ul-gap-4" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
          <div *ngFor="let surface of surfaces" class="ul-p-4">
            <h3 class="ul-typography-body-l-regular ul-mb-2">{{surface.name}}</h3>
            <div [class]="surface.class" class="ul-p-8 ul-rounded-2 ul-mb-2">
              Default
            </div>
            <div [class]="surface.class + ':hover'" class="ul-p-8 ul-rounded-2 ul-mb-2">
              Hover
            </div>
            <div [class]="surface.class + ':active'" class="ul-p-8 ul-rounded-2 ul-mb-2">
              Active
            </div>
            <div [class]="surface.class + ':selected'" class="ul-p-8 ul-rounded-2 ul-mb-2">
              Selected
            </div>
            <div [class]="surface.class + ':disabled'" class="ul-p-8 ul-rounded-2">
              Disabled
            </div>
            <code>.{{surface.class}}</code>
          </div>
        </div>
      </div>
    `,
    props: {
      surfaces: [
        {
          name: 'Solid Grey Level 1',
          class: 'ul-interactive-surface-solid-grey-lvl-1',
        },
        {
          name: 'Solid Grey Level 2',
          class: 'ul-interactive-surface-solid-grey-lvl-2',
        },
        { name: 'Solid Purple', class: 'ul-interactive-surface-solid-purple' },
        { name: 'Solid Red', class: 'ul-interactive-surface-solid-red' },
        { name: 'Solid White', class: 'ul-interactive-surface-solid-white' },
        { name: 'Solid Yellow', class: 'ul-interactive-surface-solid-yellow' },
        { name: 'Solid Green', class: 'ul-interactive-surface-solid-green' },
        { name: 'Solid Orange', class: 'ul-interactive-surface-solid-orange' },
        {
          name: 'Transparent Purple',
          class: 'ul-interactive-surface-transparent-purple',
        },
        {
          name: 'Transparent Red',
          class: 'ul-interactive-surface-transparent-red',
        },
        {
          name: 'Transparent White',
          class: 'ul-interactive-surface-transparent-white',
        },
        {
          name: 'Transparent Orange',
          class: 'ul-interactive-surface-transparent-orange',
        },
        {
          name: 'Transparent Green',
          class: 'ul-interactive-surface-transparent-green',
        },
        {
          name: 'Transparent Black',
          class: 'ul-interactive-surface-transparent-black',
        },
        {
          name: 'Transparent Yellow',
          class: 'ul-interactive-surface-transparent-yellow',
        },
        { name: 'Ghost Purple', class: 'ul-interactive-surface-ghost-purple' },
        { name: 'Ghost Red', class: 'ul-interactive-surface-ghost-red' },
        { name: 'Ghost White', class: 'ul-interactive-surface-ghost-white' },
        { name: 'Ghost Green', class: 'ul-interactive-surface-ghost-green' },
      ],
    },
  }),
};
