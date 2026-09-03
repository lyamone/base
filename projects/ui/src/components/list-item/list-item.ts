import { Component, contentChild, input } from '@angular/core';

import { CheckboxComponent } from '../checkbox/checkbox';
import { SkeletonComponent } from '../skeleton/skeleton';

export type ListItemTheme =
  | 'ghost-white'
  | 'transparent-white'
  | 'outline-white'
  | 'outline-purple';

@Component({
  selector: 'ul-list-item',
  imports: [SkeletonComponent],
  template: `
    <ul-skeleton [show]="loading()" variant="rect">
      <button
        type="button"
        class="ul-list-item ul-list-item--{{ theme() }}"
        [class.ul-list-item--no-focus-outline]="hideFocusOutline()"
        [class.ul-list-item--selected]="selected() || !!checkbox()?.checked()"
        (click)="clickHandler()"
        [disabled]="disabled() || loading()"
      >
        <div class="ul-list-item__before-label">
          <ng-content select="[ul-list-item-before-label]" />
        </div>
        <div class="ul-list-item__label">
          <ng-content select="[ul-list-item-label]" />
        </div>
        <div class="ul-list-item__after-label">
          <ng-content select="[ul-list-item-after-label]" />
        </div>
      </button>
    </ul-skeleton>
  `,
  styleUrls: ['./list-item.scss'],
})
export class ListItemComponent {
  checkbox = contentChild<CheckboxComponent>(CheckboxComponent);

  theme = input<ListItemTheme>('ghost-white');
  disabled = input<boolean>(false);
  hideFocusOutline = input<boolean>(false);
  selected = input<boolean>(false);

  loading = input<boolean>(false);

  clickHandler() {
    if (this.disabled() || this.loading()) {
      return;
    }

    if (!this.disabled()) {
      this.checkbox()?.checked.update((value) => !value);
    }
  }
}
