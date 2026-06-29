import { Meta, StoryObj } from '../../../.storybook/types';

const meta: Meta = {
  title: 'Foundations/Borders',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Border color and radius utilities. Use `.ul-border-*` for border colors and `.ul-rounded-*` for border radius. Complements the color and spacing foundations.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const BorderColors: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4">
        <h2 class="ul-typography-headline-l-regular ul-mb-8">Border Colors</h2>
        
        <div class="ul-gap-4" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
          <div *ngFor="let color of colors" class="ul-p-4">
            <div [class]="color.class" class="ul-p-8 ul-rounded-2" style="border-width: 2px; border-style: solid;">
              <p class="ul-typography-body-m-regular">{{color.name}}</p>
              <code>.{{color.class}}</code>
            </div>
          </div>
        </div>
      </div>
    `,
    props: {
      colors: [
        { name: 'White Light', class: 'ul-border-white-light' },
        {
          name: 'White Medium Strong',
          class: 'ul-border-white-medium-strong',
        },
        { name: 'Purple', class: 'ul-border-purple' },
        { name: 'White Medium', class: 'ul-border-white-medium' },
        { name: 'Grey', class: 'ul-border-grey' },
        { name: 'Black', class: 'ul-border-black' },
        { name: 'White', class: 'ul-border-white' },
        { name: 'Red', class: 'ul-border-red' },
        { name: 'Green', class: 'ul-border-green' },
        { name: 'Orange', class: 'ul-border-orange' },
        { name: 'Yellow', class: 'ul-border-yellow' },
      ],
    },
  }),
};

export const BorderRadius: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4">
        <h2 class="ul-typography-headline-l-regular ul-mb-8">Border Radius</h2>
        
        <div class="ul-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let radius of radii">
            <h3 class="ul-typography-body-l-regular ul-mb-4">{{radius.name}}</h3>
            <div [class]="radius.class" class="ul-bg-purple" style="width: 100px; height: 100px;">
            </div>
            <code>.{{radius.class}}</code>
            <p class="ul-typography-body-m-regular">{{radius.pixels}}px</p>
          </div>
        </div>
      </div>
    `,
    props: {
      radii: [
        { name: 'None', class: 'ul-rounded-none', pixels: 0 },
        { name: 'Small', class: 'ul-rounded-1', pixels: 4 },
        { name: 'Medium', class: 'ul-rounded-2', pixels: 8 },
        { name: 'Large', class: 'ul-rounded-3', pixels: 12 },
        { name: 'XLarge', class: 'ul-rounded-4', pixels: 16 },
        { name: '2XLarge', class: 'ul-rounded-6', pixels: 24 },
        { name: '3XLarge', class: 'ul-rounded-8', pixels: 32 },
        { name: '4XLarge', class: 'ul-rounded-16', pixels: 64 },
        { name: 'Full', class: 'ul-rounded-full', pixels: 4096 },
      ],
    },
  }),
};

export const Shadows: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4">
        <h2 class="ul-typography-headline-l-regular ul-mb-8">Shadows</h2>
        
        <div class="ul-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let shadow of shadows">
            <h3 class="ul-typography-body-l-regular ul-mb-4">{{shadow.name}}</h3>
            <div [class]="shadow.class" class="ul-bg-grey-lvl-1" style="width: 200px; height: 100px;">
            </div>
            <code>.{{shadow.class}}</code>
            <p class="ul-typography-body-m-regular">{{shadow.description}}</p>
          </div>
        </div>
      </div>
    `,
    props: {
      shadows: [
        {
          name: 'None',
          class: 'ul-shadow-none',
          description: 'No shadow',
        },
        {
          name: 'Small',
          class: 'ul-shadow-sm',
          description: '0px 4px 8px rgba(0, 0, 0, 0.25), 0px 0px 4px rgba(0, 0, 0, 0.12)',
        },
        {
          name: 'Medium',
          class: 'ul-shadow-md',
          description: '0px 8px 16px rgba(0, 0, 0, 0.25), 0px 4px 8px rgba(0, 0, 0, 0.12)',
        },
        {
          name: 'Large',
          class: 'ul-shadow-lg',
          description: '0px 16px 32px rgba(0, 0, 0, 0.25), 0px 8px 16px rgba(0, 0, 0, 0.12)',
        },
      ],
    },
  }),
};

export const Blur: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4">
        <h2 class="ul-typography-headline-l-regular ul-mb-8">Backdrop Blur</h2>
        
        <div class="ul-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let blur of blurs">
            <h3 class="ul-typography-body-l-regular ul-mb-4">{{blur.name}}</h3>
            <div [class]="blur.class" class="ul-bg-white-light" style="width: 200px; height: 100px;">
            </div>
            <code>.{{blur.class}}</code>
            <p class="ul-typography-body-m-regular">{{blur.pixels}}px blur</p>
          </div>
        </div>
      </div>
    `,
    props: {
      blurs: [
        { name: 'None', class: 'ul-blur-0', pixels: 0 },
        { name: 'Small', class: 'ul-blur-32', pixels: 32 },
        { name: 'Medium', class: 'ul-blur-128', pixels: 128 },
        { name: 'Large', class: 'ul-blur-256', pixels: 256 },
      ],
    },
  }),
};
