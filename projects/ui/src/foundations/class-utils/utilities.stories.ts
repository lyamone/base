import { Meta, StoryObj } from '../../../.storybook/types';

const meta: Meta = {
  title: 'Foundations/Utilities',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Additional utility classes built on top of the design tokens: line clamp, size helpers, and transform/position helpers.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const LineClamp: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4 ul-gap-6" style="display: flex; flex-direction: column; max-width: 600px;">
        <h2 class="ul-typography-headline-l-regular ul-mb-4">Line clamp</h2>
        <p class="ul-typography-body-m-regular ul-mb-4">
          Use <code>.ul-line-clamp-*</code> to truncate multi-line text with an ellipsis.
        </p>

        <div class="ul-gap-4" style="display: flex; flex-direction: column;">
          <div>
            <h3 class="ul-typography-body-l-regular ul-mb-2">Clamp to 1 line</h3>
            <p class="ul-typography-body-m-regular ul-line-clamp-1 ul-bg-grey-lvl-1 ul-p-3 ul-rounded-2">
              This is a long piece of text that will be truncated after a single line using the .ul-line-clamp-1 utility class.
            </p>
            <code>.ul-line-clamp-1</code>
          </div>

          <div>
            <h3 class="ul-typography-body-l-regular ul-mb-2">Clamp to 2 lines</h3>
            <p class="ul-typography-body-m-regular ul-line-clamp-2 ul-bg-grey-lvl-1 ul-p-3 ul-rounded-2">
              This is a long piece of text that will be truncated after two lines using the .ul-line-clamp-2 utility class. It is useful for cards and list items where you want consistent heights.
            </p>
            <code>.ul-line-clamp-2</code>
          </div>

          <div>
            <h3 class="ul-typography-body-l-regular ul-mb-2">Clamp to 3 lines</h3>
            <p class="ul-typography-body-m-regular ul-line-clamp-3 ul-bg-grey-lvl-1 ul-p-3 ul-rounded-2">
              This is a long piece of text that will be truncated after three lines using the .ul-line-clamp-3 utility class. Ideal for richer descriptions while still preserving layout stability across cards.
            </p>
            <code>.ul-line-clamp-3</code>
          </div>
        </div>
      </div>
    `,
  }),
};

export const SizeUtilities: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4 ul-gap-6" style="display: flex; flex-direction: column;">
        <h2 class="ul-typography-headline-l-regular ul-mb-4">Width & height utilities</h2>
        <p class="ul-typography-body-m-regular ul-mb-4">
          Use <code>.ul-w-*</code> and <code>.ul-h-*</code> to size elements using the spacing scale.
        </p>

        <div class="ul-gap-4" style="display: flex; flex-wrap: wrap; align-items: flex-end;">
          <div class="ul-p-4 ul-bg-grey-lvl-1 ul-rounded-2">
            <div class="ul-bg-purple ul-w-16 ul-h-8 ul-rounded-2"></div>
            <p class="ul-typography-body-m-regular ul-mt-2">.ul-w-16 .ul-h-8</p>
          </div>

          <div class="ul-p-4 ul-bg-grey-lvl-1 ul-rounded-2">
            <div class="ul-bg-purple ul-w-24 ul-h-12 ul-rounded-2"></div>
            <p class="ul-typography-body-m-regular ul-mt-2">.ul-w-24 .ul-h-12</p>
          </div>

          <div class="ul-p-4 ul-bg-grey-lvl-1 ul-rounded-2">
            <div class="ul-bg-purple ul-w-32 ul-h-16 ul-rounded-2"></div>
            <p class="ul-typography-body-m-regular ul-mt-2">.ul-w-32 .ul-h-16</p>
          </div>
        </div>
      </div>
    `,
  }),
};

export const TransformAndPosition: Story = {
  render: () => ({
    template: `
      <div class="ul-p-4 ul-gap-6" style="display: flex; flex-direction: column; max-width: 640px;">
        <h2 class="ul-typography-headline-l-regular ul-mb-4">Transform & position helpers</h2>
        <p class="ul-typography-body-m-regular ul-mb-4">
          Translate and offset elements using the spacing scale with <code>.ul-translate-x-*</code>, <code>.ul-translate-y-*</code>,
          and positional utilities like <code>.ul-top-*</code>.
        </p>

        <div class="ul-bg-grey-lvl-1 ul-rounded-2 ul-p-6" style="position: relative; height: 160px; overflow: hidden;">
          <div
            class="ul-bg-purple ul-w-16 ul-h-8 ul-rounded-2 ul-translate-x-8"
            style="transform: translateY(0);"
          ></div>

          <div
            class="ul-bg-purple ul-w-16 ul-h-8 ul-rounded-2 ul-translate-y-8"
            style="transform: translateX(0); margin-top: 24px;"
          ></div>

          <div
            class="ul-bg-purple ul-w-16 ul-h-8 ul-rounded-2 ul-top-8"
            style="position: absolute; right: 16px;"
          ></div>
        </div>

        <div class="ul-gap-2" style="display: flex; flex-direction: column;">
          <code>.ul-translate-x-8</code>
          <code>.ul-translate-y-8</code>
          <code>.ul-top-8</code>
        </div>
      </div>
    `,
  }),
};

