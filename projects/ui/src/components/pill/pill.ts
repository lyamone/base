import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

import { ButtonComponent } from '../button/button';
import { IconComponent } from '../icon/icon';

export type PillSize = 'sm' | 'md' | 'lg';

export type PillVariant =
  | 'interactive'
  | 'interactive-rounded'
  | 'read-only'
  | 'dismissible'
  | 'selectable';

export type PillTheme =
  | 'fill-white'
  | 'fill-black'
  | 'fill-purple'
  | 'fill-red'
  | 'fill-green'
  | 'transparent-white'
  | 'transparent-purple'
  | 'transparent-red'
  | 'transparent-green'
  | 'stroke-white'
  | 'outline-white'
  | 'outline-purple'
  | 'outline-red'
  | 'outline-green';

@Component({
  selector: 'ul-pill',
  imports: [CommonModule, ButtonComponent, IconComponent],
  templateUrl: './pill.html',
  styleUrls: ['./pill.scss'],
})
export class PillComponent {
  variant = input<PillVariant>('interactive');
  theme = input<PillTheme>('transparent-white');
  size = input<PillSize>('md');
  disabled = input<boolean>(false);

  dismiss = output<void>();

  dismissibleButtonTheme = computed(() => {
    const t = this.theme();
    if (t === 'transparent-purple' || t === 'outline-purple') return 'ghost-purple';
    if (t === 'outline-red') return 'ghost-red';
    if (t === 'outline-green') return 'ghost-green';
    return 'ghost-white';
  });

  modifierClass = computed(() => {
    const classes = [
      'ul-pill',
      `ul-pill--${this.variant()}`,
      `ul-pill--${this.theme()}`,
      `ul-pill--${this.size()}`,
    ];

    if (this.disabled()) {
      classes.push('ul-pill--disabled');
    }

    return classes;
  });
}
