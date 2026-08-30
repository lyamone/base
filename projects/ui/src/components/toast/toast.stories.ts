import { Component, inject, input } from '@angular/core';

import { Meta, StoryObj } from '../../../.storybook/types';

import { ButtonComponent } from '../button/button';

import { ToastContainerComponent } from './toast';
import { ToastService } from './toast.service';

@Component({
  selector: 'ul-toast-story',
  imports: [ButtonComponent, ToastContainerComponent],
  template: `
    <div style="padding: 24px; display: flex; flex-direction: column; gap: 16px; max-width: 480px;">
      @if (mode() === 'info') {
        <p class="ul-typography-body-m-regular">
          Click the button to trigger an informational toast. The toast will auto-dismiss after a
          few seconds.
        </p>

        <ul-button theme="fill-purple" (buttonClick)="showInfoToast()"> Show info toast </ul-button>
      } @else {
        <p class="ul-typography-body-m-regular">
          Trigger different toast variants. All are rendered by a single global container.
        </p>

        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          <ul-button theme="fill-purple" (buttonClick)="showInfoToast()">Info</ul-button>
          <ul-button theme="fill-green" (buttonClick)="showSuccessToast()">Success</ul-button>
          <ul-button theme="fill-yellow" (buttonClick)="showWarningToast()">Warning</ul-button>
          <ul-button theme="fill-red" (buttonClick)="showErrorToast()">Error</ul-button>
        </div>
      }

      <ul-toast-container />
    </div>
  `,
})
class ToastStoryComponent {
  private readonly toast = inject(ToastService);

  readonly mode = input<'info' | 'variants'>('info');

  showInfoToast(): void {
    this.toast.info('Profile updated successfully.');
  }

  showSuccessToast(): void {
    this.toast.success('Settings saved.');
  }

  showWarningToast(): void {
    this.toast.warning('Your session is about to expire.');
  }

  showErrorToast(): void {
    this.toast.error('Something went wrong, please try again.');
  }
}

const meta: Meta<ToastStoryComponent> = {
  title: 'Components/Feedback/Toast',
  component: ToastStoryComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Global toast notification system for transient feedback messages. Render `ul-toast-container` once near the root of your app and inject `ToastService` to show toasts (info, success, warning, error). Uses ARIA roles (status/alert) and lives above other UI using the toast elevation token.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ToastStoryComponent>;

export const InfoToast: Story = {
  args: {
    mode: 'info',
  },
};

export const Variants: Story = {
  args: {
    mode: 'variants',
  },
};
