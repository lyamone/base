import { Meta, StoryObj } from '../../../.storybook/types';

const meta: Meta = {
  title: 'Foundations/Spacing',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Spacing scale and utility classes for margins, padding, and gap. Use `.ul-m-*`, `.ul-p-*`, `.ul-gap-*` with scale values (1–9, etc.) for consistent layout.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Margins: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4">
        <h2 class="ul-typography-headline-l-regular ul-mb-8">Margins</h2>
        
        <div class="ul-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let size of sizes">
            <h3 class="ul-typography-body-l-regular ul-mb-4">Margin {{size.name}}</h3>
            <div class="ul-bg-grey-lvl-1" style="width: fit-content;">
              <div [class]="'ul-m-' + size.value" class="ul-bg-purple" style="width: 100px; height: 100px;">
              </div>
            </div>
            <code>.ul-m-{{size.value}}</code>
            <p class="ul-typography-body-m-regular">{{size.pixels}}px</p>
          </div>
        </div>
      </div>
    `,
    props: {
      sizes: [
        { name: '1', value: '1', pixels: 4 },
        { name: '2', value: '2', pixels: 8 },
        { name: '3', value: '3', pixels: 12 },
        { name: '4', value: '4', pixels: 16 },
        { name: '5', value: '5', pixels: 20 },
        { name: '6', value: '6', pixels: 24 },
        { name: '7', value: '7', pixels: 28 },
        { name: '8', value: '8', pixels: 32 },
        { name: '9', value: '9', pixels: 36 },
        { name: '10', value: '10', pixels: 40 },
        { name: '11', value: '11', pixels: 44 },
        { name: '12', value: '12', pixels: 48 },
        { name: '14', value: '14', pixels: 56 },
        { name: '15', value: '15', pixels: 60 },
        { name: '16', value: '16', pixels: 64 },
        { name: '20', value: '20', pixels: 80 },
        { name: '24', value: '24', pixels: 96 },
        { name: '28', value: '28', pixels: 112 },
        { name: '32', value: '32', pixels: 128 },
      ],
    },
  }),
};

export const Padding: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4">
        <h2 class="ul-typography-headline-l-regular ul-mb-8">Padding</h2>
        
        <div class="ul-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let size of sizes">
            <h3 class="ul-typography-body-l-regular ul-mb-4">Padding {{size.name}}</h3>
            <div [class]="'ul-p-' + size.value" class="ul-bg-purple" style="width: fit-content;">
              <div class="ul-bg-grey-lvl-1" style="width: 100px; height: 100px;">
              </div>
            </div>
            <code>.ul-p-{{size.value}}</code>
            <p class="ul-typography-body-m-regular">{{size.pixels}}px</p>
          </div>
        </div>
      </div>
    `,
    props: {
      sizes: [
        { name: '1', value: '1', pixels: 4 },
        { name: '2', value: '2', pixels: 8 },
        { name: '3', value: '3', pixels: 12 },
        { name: '4', value: '4', pixels: 16 },
        { name: '5', value: '5', pixels: 20 },
        { name: '6', value: '6', pixels: 24 },
        { name: '7', value: '7', pixels: 28 },
        { name: '8', value: '8', pixels: 32 },
        { name: '9', value: '9', pixels: 36 },
        { name: '10', value: '10', pixels: 40 },
        { name: '11', value: '11', pixels: 44 },
        { name: '12', value: '12', pixels: 48 },
        { name: '14', value: '14', pixels: 56 },
        { name: '15', value: '15', pixels: 60 },
        { name: '16', value: '16', pixels: 64 },
        { name: '20', value: '20', pixels: 80 },
        { name: '24', value: '24', pixels: 96 },
        { name: '28', value: '28', pixels: 112 },
        { name: '32', value: '32', pixels: 128 },
      ],
    },
  }),
};

export const Gaps: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4">
        <h2 class="ul-typography-headline-l-regular ul-mb-8">Gaps</h2>
        
        <div class="ul-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let size of sizes">
            <h3 class="ul-typography-body-l-regular ul-mb-4">Gap {{size.name}}</h3>
            <div [class]="'ul-gap-' + size.value" style="display: flex;">
              <div class="ul-bg-purple" style="width: 100px; height: 100px;"></div>
              <div class="ul-bg-purple" style="width: 100px; height: 100px;"></div>
              <div class="ul-bg-purple" style="width: 100px; height: 100px;"></div>
            </div>
            <code>.ul-gap-{{size.value}}</code>
            <p class="ul-typography-body-m-regular">{{size.pixels}}px</p>
          </div>
        </div>
      </div>
    `,
    props: {
      sizes: [
        { name: '1', value: '1', pixels: 4 },
        { name: '2', value: '2', pixels: 8 },
        { name: '3', value: '3', pixels: 12 },
        { name: '4', value: '4', pixels: 16 },
        { name: '5', value: '5', pixels: 20 },
        { name: '6', value: '6', pixels: 24 },
        { name: '7', value: '7', pixels: 28 },
        { name: '8', value: '8', pixels: 32 },
        { name: '9', value: '9', pixels: 36 },
        { name: '10', value: '10', pixels: 40 },
        { name: '11', value: '11', pixels: 44 },
        { name: '12', value: '12', pixels: 48 },
        { name: '14', value: '14', pixels: 56 },
        { name: '15', value: '15', pixels: 60 },
        { name: '16', value: '16', pixels: 64 },
        { name: '20', value: '20', pixels: 80 },
        { name: '24', value: '24', pixels: 96 },
        { name: '28', value: '28', pixels: 112 },
        { name: '32', value: '32', pixels: 128 },
      ],
    },
  }),
};

export const DirectionalSpacing: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4">
        <h2 class="ul-typography-headline-l-regular ul-mb-8">Directional Spacing</h2>
        
        <div class="ul-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let type of types">
            <h3 class="ul-typography-body-l-regular ul-mb-4">{{type.name}}</h3>
            <div class="ul-bg-grey-lvl-1 ul-p-4">
              <div [class]="type.class" class="ul-bg-purple" style="width: 100px; height: 100px;">
              </div>
            </div>
            <code>.{{type.class}}</code>
            <p class="ul-typography-body-m-regular">{{type.description}}</p>
          </div>
        </div>
      </div>
    `,
    props: {
      types: [
        {
          name: 'Margin X',
          class: 'ul-mx-4',
          description: 'Horizontal margin (left and right)',
        },
        {
          name: 'Margin Y',
          class: 'ul-my-4',
          description: 'Vertical margin (top and bottom)',
        },
        {
          name: 'Margin Top',
          class: 'ul-mt-4',
          description: 'Top margin only',
        },
        {
          name: 'Margin Right',
          class: 'ul-mr-4',
          description: 'Right margin only',
        },
        {
          name: 'Margin Bottom',
          class: 'ul-mb-4',
          description: 'Bottom margin only',
        },
        {
          name: 'Margin Left',
          class: 'ul-ml-4',
          description: 'Left margin only',
        },
        {
          name: 'Padding X',
          class: 'ul-px-4',
          description: 'Horizontal padding (left and right)',
        },
        {
          name: 'Padding Y',
          class: 'ul-py-4',
          description: 'Vertical padding (top and bottom)',
        },
        {
          name: 'Padding Top',
          class: 'ul-pt-4',
          description: 'Top padding only',
        },
        {
          name: 'Padding Right',
          class: 'ul-pr-4',
          description: 'Right padding only',
        },
        {
          name: 'Padding Bottom',
          class: 'ul-pb-4',
          description: 'Bottom padding only',
        },
        {
          name: 'Padding Left',
          class: 'ul-pl-4',
          description: 'Left padding only',
        },
      ],
    },
  }),
};
