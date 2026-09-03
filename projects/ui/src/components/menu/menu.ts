import { CdkMenu } from '@angular/cdk/menu';
import { Component, input, output, signal, viewChild, ViewEncapsulation } from '@angular/core';

import { IconName } from '../icon/icon';
import { ListItemTheme } from '../list-item/list-item';

import { MenuItem, MenuItemsComponent } from './menu-items';
import { MenuTriggerComponent } from './menu-trigger';

/**
 * A trigger + panel for an action menu (edit, delete, share, ...). Unlike
 * `ul-dropdown`, there is no notion of a "currently selected" item — every
 * item is a one-off action, so nothing is ever shown as checked.
 *
 * Pass `items` for the common label+icon action-list case, and/or project
 * custom content (e.g. a `ul-list-item cdkMenuItem routerLink="...">` for a
 * navigation item) — both can be combined, or you can skip `items`
 * entirely and compose the panel purely from projected content.
 *
 * Below the 'md' breakpoint the panel renders as a bottom sheet (full
 * width, pinned to the viewport, tap-outside-to-dismiss) instead of a
 * small anchored popover — the same behavior `ul-dropdown` gets.
 *
 * @example
 * ```html
 * <ul-menu
 *   [items]="[{ label: 'Edit', value: 'edit', leftIcons: ['edit'] },
 *             { label: 'Delete', value: 'delete', leftIcons: ['trash'] }]"
 *   triggerIconOnly="more_options"
 *   (itemSelected)="onAction($event)">
 * </ul-menu>
 * ```
 */
@Component({
  selector: 'ul-menu',
  imports: [CdkMenu, MenuItemsComponent, MenuTriggerComponent],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent {
  /** Visual theme, passed through to the trigger and to any items rendered via `items`. */
  theme = input<ListItemTheme>('ghost-white');

  /** Simple label+icon action items. Optional — content projection covers everything else. */
  items = input<MenuItem[]>([]);

  disabled = input(false);

  /**
   * Shows only a single icon in the trigger, hiding any label. Commonly
   * `'more_options'` for a row-level "⋮" action menu.
   */
  triggerIconOnly = input<IconName>();

  /** Accessible label for the icon-only trigger. */
  iconOnlyLabel = input('Open menu');

  /** Static label for a non-icon-only trigger (there is no "current selection" to show instead). */
  triggerLabel = input('');
  triggerLeftIcons = input<IconName[]>([]);
  triggerRightIcons = input<IconName[]>([]);

  /** Emitted when an `items`-provided entry is triggered. */
  itemSelected = output<MenuItem>();

  /** Emitted when the menu closes, whether or not a selection was made. */
  closed = output<void>();

  readonly isOpen = signal(false);
  readonly menuId = `ul-menu-${Math.random().toString(36).slice(2, 11)}`;

  private readonly trigger = viewChild(MenuTriggerComponent);

  handleItemTriggered(index: number): void {
    const item = this.items()[index];
    if (item) {
      this.itemSelected.emit(item);
    }
  }

  /**
   * Closes the panel. CDK auto-closes on a `cdkMenuItem` trigger already —
   * this is for the mobile backdrop tap, which isn't one.
   */
  closeMenu(): void {
    this.trigger()?.close();
  }

  onMenuOpened(): void {
    this.isOpen.set(true);
  }

  onMenuClosed(): void {
    this.isOpen.set(false);
    this.closed.emit();
  }
}
