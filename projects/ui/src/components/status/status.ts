import { Component, computed, input } from '@angular/core';

import { IconComponent, IconName } from '../icon/icon';
import { RadialComponent } from '../radial/radial';

export type Status = 'confirm' | 'alert' | 'error' | 'pending' | 'info';

@Component({
  selector: 'ul-status',
  imports: [IconComponent, RadialComponent],
  templateUrl: './status.html',
  styleUrl: './status.scss',
})
export class StatusComponent {
  status = input<Status>('info');
  customIcon = input<IconName>();
  loadingAnimation = input<boolean>(false);

  get icon(): IconName {
    const customIcon = this.customIcon();
    if (customIcon) {
      return customIcon;
    }

    const statusIcons: Record<Status, IconName> = {
      confirm: 'check',
      alert: 'alert',
      error: 'cross',
      pending: 'hourglass',
      info: 'info',
    };

    return statusIcons[this.status()] || 'info';
  }

  computedClasses = computed(() => ({
    'ul-status': true,
    'ul-status--confirm': this.status() === 'confirm',
    'ul-status--alert': this.status() === 'alert',
    'ul-status--error': this.status() === 'error',
    'ul-status--pending': this.status() === 'pending',
    'ul-status--info': this.status() === 'info',
  }));
}
