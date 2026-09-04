import { Meta, StoryObj } from '../../../.storybook/types';

import { SearchSelectComponent, type SearchSelectOption } from './search-select';

const defaultOptions: SearchSelectOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' },
  { label: 'Honeydew', value: 'honeydew' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Lemon', value: 'lemon' },
];

const meta: Meta<SearchSelectComponent> = {
  title: 'Components/Form Elements/SearchSelect',
  component: SearchSelectComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Combobox: search input with filterable dropdown. Type to filter options and select a result. Implements `FormValueControl<string | null>` for Signal Forms. Use `[(value)]` for two-way binding. Responsive (mobile, tablet, desktop).',
      },
    },
    layout: 'centered',
  },
  decorators: [
    (story) => ({
      ...story(),
      template: `<div style="min-height: 500px; min-width: 400px;">${story().template}</div>`,
    }),
  ],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'radio' },
    },
    error: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
    showRequiredIndicator: {
      control: { type: 'boolean' },
      description:
        'Whether the "*" shows when required — set false when every field on a form is required by convention and the asterisk would just be noise. The required styling/aria stays either way.',
    },
    label: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    errorText: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
    minCharsToOpen: { control: { type: 'number' } },
  },
  args: {
    size: 'md',
    error: false,
    disabled: false,
    required: false,
    showRequiredIndicator: true,
    label: 'Search and select',
    helperText: 'Type to filter options',
    errorText: 'Please select an option',
    placeholder: 'Search...',
    minCharsToOpen: 0,
    options: defaultOptions,
    value: null,
  },
};

export default meta;
type Story = StoryObj<SearchSelectComponent>;

export const Default: Story = {
  args: {
    options: defaultOptions,
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-search-select
        [size]="size"
        [label]="label"
        [helperText]="helperText"
        [errorText]="errorText"
        [error]="error"
        [disabled]="disabled"
        [required]="required"
        [placeholder]="placeholder"
        [options]="options"
        [minCharsToOpen]="minCharsToOpen"
        [(value)]="value"
      />
    `,
  }),
};

export const WithError: Story = {
  args: {
    options: defaultOptions,
    error: true,
    value: null,
    required: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-search-select
        [size]="size"
        [label]="label"
        [helperText]="helperText"
        [errorText]="errorText"
        [error]="error"
        [disabled]="disabled"
        [required]="required"
        [showRequiredIndicator]="showRequiredIndicator"
        [placeholder]="placeholder"
        [options]="options"
        [(value)]="value"
      />
    `,
  }),
};

/**
 * When every field on a form is required by convention, a "*" on each one
 * is just noise — showRequiredIndicator hides it while required's styling
 * and aria-required stay intact.
 */
export const RequiredWithoutIndicator: Story = {
  args: {
    ...WithError.args,
    showRequiredIndicator: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-search-select
        [size]="size"
        [label]="label"
        [helperText]="helperText"
        [errorText]="errorText"
        [error]="error"
        [disabled]="disabled"
        [required]="required"
        [showRequiredIndicator]="showRequiredIndicator"
        [placeholder]="placeholder"
        [options]="options"
        [(value)]="value"
      />
    `,
  }),
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-search-select
        [size]="size" 
        [label]="label"
        [helperText]="helperText"
        [placeholder]="placeholder"
        [options]="options"
        [disabled]="disabled"
        [(value)]="value"
      />
    `,
  }),
};

export const AllSizes: Story = {
  args: {
    options: defaultOptions,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 420px;">
        <ul-search-select
          size="sm"
          label="Small"
          [options]="options"
          helperText="Small"
        />
        <ul-search-select
          size="md"
          label="Medium"
          [options]="options"
          helperText="Medium"
        />
        <ul-search-select
          size="lg"
          label="Large"
          [options]="options"
          helperText="Large"
        />
        <ul-search-select
          size="xl"
          label="Extra large"
          [options]="options"
          helperText="Extra large"
        />
      </div>
    `,
  }),
};

export const Responsive: Story = {
  args: {
    options: defaultOptions,
    label: 'Search (responsive)',
    helperText:
      'Resize the viewport to see mobile, tablet, and desktop behavior. Panel is full width of the control.',
  },
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%; max-width: 480px; padding: 1rem;">
        <ul-search-select
          [size]="size"
          [label]="label"
          [helperText]="helperText"
          [placeholder]="placeholder"
          [options]="options"
          [(value)]="value"
        />
      </div>
    `,
  }),
};
