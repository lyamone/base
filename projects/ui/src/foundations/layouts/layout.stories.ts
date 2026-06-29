import { Meta, StoryObj } from '../../../.storybook/types';

const meta: Meta = {
  title: 'Foundations/Layout',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Layout utilities: containers, flex, grid, and alignment classes. Use for page structure, spacing, and responsive behavior.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Containers: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4">
        <h2 class="ul-typography-headline-l-regular ul-mb-8">Containers</h2>
        
        <div class="ul-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let container of containers">
            <h3 class="ul-typography-body-l-regular ul-mb-4">{{container.name}}</h3>
            <div [class]="container.class" class="ul-bg-grey-lvl-1">
              <div class="ul-p-4">
                <p class="ul-typography-body-m-regular">{{container.description}}</p>
                <code>.{{container.class}}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    props: {
      containers: [
        {
          name: 'Fluid Container',
          class: 'ul-container-fluid',
          description: 'Full-width container with responsive padding',
        },
        {
          name: 'Gallery Container',
          class: 'ul-container-gallery',
          description: 'Container optimized for gallery layouts with wider padding',
        },
        {
          name: 'Product Container',
          class: 'ul-container-product',
          description: 'Container optimized for product pages with max-width',
        },
        {
          name: 'Form Container',
          class: 'ul-container-form',
          description: 'Narrow container optimized for forms',
        },
      ],
    },
  }),
};

export const Grid: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4">
        <h2 class="ul-typography-headline-l-regular ul-mb-8">Grid System</h2>
        
        <div class="ul-gap-8" style="display: flex; flex-direction: column;">
          <div>
            <h3 class="ul-typography-body-l-regular ul-mb-4">Basic Grid</h3>
            <div class="ul-row ul-gap-4">
              <div class="ul-col-4 ul-bg-purple ul-p-4">
                <code>.ul-col-4</code>
              </div>
              <div class="ul-col-4 ul-bg-purple ul-p-4">
                <code>.ul-col-4</code>
              </div>
              <div class="ul-col-4 ul-bg-purple ul-p-4">
                <code>.ul-col-4</code>
              </div>
            </div>
          </div>

          <div>
            <h3 class="ul-typography-body-l-regular ul-mb-4">Responsive Grid</h3>
            <div class="ul-row ul-gap-4">
              <div class="ul-col-12 ul-col-md-6 ul-col-lg-4 ul-bg-purple ul-p-4">
                <code>.ul-col-12 .ul-col-md-6 .ul-col-lg-4</code>
              </div>
              <div class="ul-col-12 ul-col-md-6 ul-col-lg-4 ul-bg-purple ul-p-4">
                <code>.ul-col-12 .ul-col-md-6 .ul-col-lg-4</code>
              </div>
              <div class="ul-col-12 ul-col-md-6 ul-col-lg-4 ul-bg-purple ul-p-4">
                <code>.ul-col-12 .ul-col-md-6 .ul-col-lg-4</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Breakpoints: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4">
        <h2 class="ul-typography-headline-l-regular ul-mb-8">Breakpoints</h2>
        
        <div class="ul-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let breakpoint of breakpoints">
            <div class="ul-bg-grey-lvl-1 ul-p-4">
              <h3 class="ul-typography-body-l-regular">{{breakpoint.name}}</h3>
              <p class="ul-typography-body-m-regular">{{breakpoint.description}}</p>
              <code>{{breakpoint.mediaQuery}}</code>
            </div>
          </div>
        </div>
      </div>
    `,
    props: {
      breakpoints: [
        {
          name: 'Extra Small (xs)',
          description: 'Default styles, no media query needed',
          mediaQuery: '@media (min-width: 0px)',
        },
        {
          name: 'Small (sm)',
          description: 'Tablets and larger',
          mediaQuery: '@media (min-width: 768px)',
        },
        {
          name: 'Medium (md)',
          description: 'Small desktops and larger',
          mediaQuery: '@media (min-width: 1024px)',
        },
        {
          name: 'Large (lg)',
          description: 'Medium desktops and larger',
          mediaQuery: '@media (min-width: 1280px)',
        },
        {
          name: 'Extra Large (xl)',
          description: 'Large desktops and larger',
          mediaQuery: '@media (min-width: 1600px)',
        },
      ],
    },
  }),
};

export const LineClamp: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4">
        <h2 class="ul-typography-headline-l-regular ul-mb-8">Line Clamp</h2>
        
        <div class="ul-gap-8" style="display: flex; flex-direction: column;">
          <div *ngFor="let clamp of clamps">
            <h3 class="ul-typography-body-l-regular ul-mb-4">{{clamp.name}}</h3>
            <div class="ul-bg-grey-lvl-1 ul-p-4" style="max-width: 300px;">
              <p [class]="clamp.class" class="ul-typography-body-m-regular">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <code>.{{clamp.class}}</code>
          </div>
        </div>
      </div>
    `,
    props: {
      clamps: [
        { name: '1 Line', class: 'ul-line-clamp-1' },
        { name: '2 Lines', class: 'ul-line-clamp-2' },
        { name: '3 Lines', class: 'ul-line-clamp-3' },
      ],
    },
  }),
};

export const Scrollable: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4">
        <h2 class="ul-typography-headline-l-regular ul-mb-8">Scrollable Containers</h2>
        
        <div class="ul-gap-8" style="display: flex; flex-direction: column;">
          <div>
            <h3 class="ul-typography-body-l-regular ul-mb-4">Vertical Scroll</h3>
            <div class="ul-bg-grey-lvl-1 ul-p-4">
              <div class="ul-scrollable" style="height: 200px;">
                <div class="ul-p-4">
                  <p class="ul-typography-body-m-regular ul-mb-4">Scrollable content with custom scrollbar that appears on hover.</p>
                  <p class="ul-typography-body-m-regular ul-mb-4">The scrollbar is thin and elegant, matching the dark theme.</p>
                  <p class="ul-typography-body-m-regular ul-mb-4">It supports both vertical and horizontal scrolling.</p>
                  <p class="ul-typography-body-m-regular ul-mb-4">The scrollbar appears with a fade effect when hovering over the content.</p>
                  <p class="ul-typography-body-m-regular ul-mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <p class="ul-typography-body-m-regular ul-mb-4">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <p class="ul-typography-body-m-regular ul-mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                </div>
              </div>
            </div>
            <code>.ul-scrollable</code>
          </div>

          <div>
            <h3 class="ul-typography-body-l-regular ul-mb-4">Horizontal Scroll</h3>
            <div class="ul-bg-grey-lvl-1 ul-p-4">
              <div class="ul-scrollable" style="width: 300px;">
                <div style="display: flex; gap: 16px; padding: 16px;">
                  <div class="ul-bg-purple ul-p-4" style="min-width: 200px;">
                    <p class="ul-typography-body-m-regular">Item 1</p>
                  </div>
                  <div class="ul-bg-purple ul-p-4" style="min-width: 200px;">
                    <p class="ul-typography-body-m-regular">Item 2</p>
                  </div>
                  <div class="ul-bg-purple ul-p-4" style="min-width: 200px;">
                    <p class="ul-typography-body-m-regular">Item 3</p>
                  </div>
                  <div class="ul-bg-purple ul-p-4" style="min-width: 200px;">
                    <p class="ul-typography-body-m-regular">Item 4</p>
                  </div>
                </div>
              </div>
            </div>
            <code>.ul-scrollable</code>
          </div>
        </div>
      </div>
    `,
  }),
};
