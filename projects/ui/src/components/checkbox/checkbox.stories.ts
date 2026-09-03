import { Meta, StoryObj } from '../../../.storybook/types';

import { CheckboxComponent } from './checkbox';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Form Elements/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Checkbox aligned with other form fields (input, textarea, radio-group). Uses shared form field label and helper. Optional label (prop or projected content), helperText, required, and error state. Implements `FormCheckboxControl` for Signal Forms `[formField]`. Use `[(checked)]` for two-way binding. Supports zone variants and size (default, sm, lg — lg is easier to tap on touch, e.g. mobile bulk-select rows).',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The checked state of the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state',
    },
    zone: {
      control: 'select',
      options: ['none', 'accessible', 'visible', 'checked-visible'],
      description: 'The zone type of the checkbox',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size variant of the checkbox',
    },
    label: {
      control: 'text',
      description: 'Form field label (above the checkbox), same as input/textarea',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the checkbox when not in error state',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required (shows asterisk, aria-required)',
    },
    error: {
      control: 'boolean',
      description: 'Whether the checkbox is in an error state',
    },
    errorText: {
      control: 'text',
      description: 'Error message shown below when in error state',
    },
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

// Base Story
export const Basic: Story = {
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    zone: 'none',
    size: 'default',
    error: false,
    errorText: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-checkbox
        [checked]="checked"
        [disabled]="disabled"
        [indeterminate]="indeterminate"
        [zone]="zone"
        [size]="size"
        [error]="error"
      >
        Basic Checkbox
      </ul-checkbox>
    `,
  }),
};

// Without Label
export const NoLabel: Story = {
  args: {
    ...Basic.args,
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-checkbox
        [checked]="checked"
        [disabled]="disabled"
        [indeterminate]="indeterminate"
        [zone]="zone"
        [size]="size"
        [error]="error"
      ></ul-checkbox>
    `,
  }),
};

// Disabled States
export const DisabledStates: Story = {
  args: {
    ...Basic.args,
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <ul-checkbox [checked]="checked" [disabled]="true">
          Disabled Unchecked
        </ul-checkbox>
        <ul-checkbox [checked]="false" [disabled]="true">
          Disabled Checked
        </ul-checkbox>
        <ul-checkbox [checked]="checked" [disabled]="true" [indeterminate]="true">
          Disabled Indeterminate
        </ul-checkbox>
      </div>
    `,
  }),
};

// Zone Variants
export const ZoneVariants: Story = {
  args: {
    ...Basic.args,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <ul-checkbox [checked]="checked" zone="accessible">
          Accessible Zone
        </ul-checkbox>
        <ul-checkbox [checked]="checked" zone="visible">
          Visible Zone
        </ul-checkbox>
        <ul-checkbox [checked]="checked" zone="checked-visible">
          Checked Visible Zone
        </ul-checkbox>
      </div>
    `,
  }),
};

// Size Variants
export const SizeVariants: Story = {
  args: {
    ...Basic.args,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <ul-checkbox [checked]="checked" size="default">
          Default Size
        </ul-checkbox>
        <ul-checkbox [checked]="checked" size="sm">
          Small Size
        </ul-checkbox>
        <ul-checkbox [checked]="checked" size="lg">
          Large Size
        </ul-checkbox>
      </div>
    `,
  }),
};

// Form field (label + helper, aligned with input/textarea)
export const FormField: Story = {
  args: {
    ...Basic.args,
    label: 'Accept terms and conditions',
    helperText: 'You must agree to continue.',
    required: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-checkbox
        [checked]="checked"
        [label]="label"
        [helperText]="helperText"
        [required]="required"
        [disabled]="disabled"
        [size]="size"
      >
        I agree to the terms
      </ul-checkbox>
    `,
  }),
};

// Error State
export const ErrorState: Story = {
  args: {
    ...Basic.args,
    error: true,
    errorText: 'This field is required',
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-checkbox [checked]="checked" [error]="true" [errorText]="errorText">
        Error State Checkbox
      </ul-checkbox>
    `,
  }),
};

// Long Label
export const LongLabel: Story = {
  args: {
    ...Basic.args,
  },
  render: (args) => ({
    props: args,
    template: `
      <ul-checkbox [checked]="checked" zone="visible">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab atque delectus 
        dignissimos, ducimus eligendi esse eveniet, facilis laudantium minus natus 
        nobis quaerat quasi quos sint soluta suscipit tenetur ut voluptatum.
      </ul-checkbox>
    `,
  }),
};
