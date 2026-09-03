import { CdkMenuItem } from '@angular/cdk/menu';
import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { IconComponent, IconName } from '../icon/icon';
import { ListItemComponent, ListItemTheme } from '../list-item/list-item';

/** A single row in a `ul-menu` or `ul-dropdown` menu panel. */
export type MenuItem = {
  /** Display text for the item. */
  label: string;
  /** Optional value associated with the item. */
  value?: string;
  /** Icons to display on the left side of the item. */
  leftIcons?: IconName[];
  /** Icons to display on the right side of the item. */
  rightIcons?: IconName[];
  /** Whether the item is disabled and cannot be triggered. */
  disabled?: boolean;
};

/**
 * Renders `items` as `ul-list-item` + `cdkMenuItem` rows inside an
 * already-open `cdkMenu` panel. Shared by `ul-dropdown` (which passes
 * `selectedIndex` so the current choice renders with a checkmark) and
 * `ul-menu` (which leaves `selectedIndex` as `null` — every item there is a
 * one-off action, never a persisted "current selection").
 */
@Component({
  selector: 'ul-menu-items',
  imports: [CdkMenuItem, NgTemplateOutlet, ListItemComponent, IconComponent],
  template: `
    <ng-template #renderIcons let-icons>
      @for (icon of icons; track icon) {
        <ul-icon size="5" [icon]="icon" />
      }
    </ng-template>

    @for (item of items(); track $index) {
      <ul-list-item
        cdkMenuItem
        [theme]="theme()"
        [disabled]="!!item.disabled"
        (cdkMenuItemTriggered)="itemTriggered.emit($index)"
        [attr.role]="selectedIndex() === null ? 'menuitem' : 'menuitemradio'"
        [attr.aria-checked]="
          selectedIndex() === null ? null : selectedIndex() === $index ? 'true' : 'false'
        "
      >
        <ng-container ul-list-item-before-label>
          <ng-container *ngTemplateOutlet="renderIcons; context: { $implicit: item.leftIcons }" />
        </ng-container>
        <ng-container ul-list-item-label>{{ item.label }}</ng-container>
        <ng-container ul-list-item-after-label>
          <ng-container *ngTemplateOutlet="renderIcons; context: { $implicit: item.rightIcons }" />
          @if (selectedIndex() === $index) {
            <ul-icon size="5" icon="check" />
          }
        </ng-container>
      </ul-list-item>
    }
  `,
})
export class MenuItemsComponent {
  items = input<MenuItem[]>([]);
  theme = input<ListItemTheme>('ghost-white');
  /**
   * Index of the item to render as checked/selected.
   * @default null - no item is ever shown as checked (the action-menu case).
   */
  selectedIndex = input<number | null>(null);
  itemTriggered = output<number>();
}
