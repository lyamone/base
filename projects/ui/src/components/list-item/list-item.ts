import { ChangeDetectionStrategy, Component, contentChild, input } from '@angular/core';

import { CheckboxComponent } from '../checkbox/checkbox';
import { SkeletonComponent } from '../skeleton/skeleton';

export type ListItemTheme = 'ghost-white' | 'transparent-white' | 'outline-white' | 'outline-purple';

@Component({
  selector: 'ul-list-item',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <ul-skeleton [show]="loading()" variant="rect">
      <button
        class="ul-list-item ul-list-item--{{ theme() }}"
        [class.ul-list-item--no-focus-outline]="hideFocusOutline()"
        [class.ul-list-item--selected]="selected() || !!checkbox()?.checked"
        (click)="clickHandler()"
        [disabled]="disabled() || loading()">
        <div class="ul-list-item__before-label">
          <ng-content select="[ul-list-item-before-label]"></ng-content>
        </div>
        <div class="ul-list-item__label">
          <ng-content select="[ul-list-item-label]"></ng-content>
        </div>
        <div class="ul-list-item__after-label">
          <ng-content select="[ul-list-item-after-label]"></ng-content>
        </div>
      </button>
    </ul-skeleton>
  `,
  styleUrls: ['./list-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
