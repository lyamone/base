import { Component, ViewEncapsulation, computed, inject } from '@angular/core';

import { ButtonComponent } from '../button/button';
import { IconComponent } from '../icon/icon';

import { ToastService, ToastWithRole } from './toast.service';

@Component({
  selector: 'ul-toast-container',
  imports: [ButtonComponent, IconComponent],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ToastContainerComponent {
  private readonly toastService = inject(ToastService);
  readonly toasts = this.toastService.toasts;

  trackById(_: number, toast: ToastWithRole): string {
    return toast.id;
  }

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}
