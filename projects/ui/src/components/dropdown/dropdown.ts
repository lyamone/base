import { CdkMenu } from '@angular/cdk/menu';
import {
  Component,
  computed,
  input,
  model,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

import { IconName } from '../icon/icon';
import { ListItemTheme } from '../list-item/list-item';
import { MenuItem, MenuItemsComponent } from '../menu/menu-items';
import { MenuTriggerComponent } from '../menu/menu-trigger';

/** @deprecated Import from `../menu/menu-items` instead — kept here so existing `DropdownItem` imports keep working. */
export type DropdownItem = MenuItem;

const DEFAULT_MENU_TRIGGER_ICONS: Pick<MenuItem, 'leftIcons' | 'rightIcons'> = {
  rightIcons: ['chevron_down'],
};

/**
 * A customizable dropdown component that displays a list of selectable items.
 *
 * Features:
 * - Configurable themes (ghost-white, transparent-white)
 * - Icon support for items and trigger button
 * - Customizable trigger appearance
 * - Disabled item support
 * - Two-way binding for selected item
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <uds-dropdown
 *   [items]="dropdownItems"
 *   [theme]="'transparent-white'"
 *   (selectedItemChange)="onItemSelected($event)">
 * </uds-dropdown>
 *
 * <!-- More options menu -->
 * <uds-dropdown
 *   [items]="actionItems"
 *   [onlyMenuTriggerIcon]="'more_options'">
 * </uds-dropdown>
 * ```
 */
@Component({
  selector: 'ul-dropdown',
  imports: [CdkMenu, MenuItemsComponent, MenuTriggerComponent],
  templateUrl: './dropdown.html',
  styleUrls: ['./dropdown.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent {
  /**
   * The visual theme for the dropdown.
   * @default 'ghost-white'
   */
  theme = input<ListItemTheme>('ghost-white');

  /**
   * Array of items to display in the dropdown menu.
   * @default []
   */
  items = input<MenuItem[]>([]);

  /**
   * Whether the dropdown is disabled.
   * @default false
   */
  disabled = input<boolean>(false);

  /**
   * Overrides the icons of the selected item in the trigger button.
   * Can override leftIcons, rightIcons, or both.
   * @default { rightIcons: ['chevron_down'] }
   *
   * @example
   * ```typescript
   * menuTriggerIcons = {
   *  chevron_down
   * }
   * ```
   */
  menuTriggerIcons = input<Pick<MenuItem, 'leftIcons' | 'rightIcons'> | undefined>(
    DEFAULT_MENU_TRIGGER_ICONS,
  );

  /**
   * Shows only a single icon in the trigger button, hiding the selected item's label and icons.
   * Commonly used with 'more_options' for action menus.
   * @default undefined
   *
   * @example
   * ```typescript
   * triggerIconOnly = 'more_options'
   * ```
   */
  triggerIconOnly = input<IconName>();

  /**
   * Accessible label for the icon-only trigger button.
   * @default 'Open menu'
   */
  iconOnlyLabel = input<string>('Open menu');

  /**
   * The index of the currently selected item.
   * Supports two-way binding with [(selectedIndex)].
   * @default 0
   */
  selectedIndex = model<number>(0);

  /**
   * The currently selected item with any trigger icon overrides applied.
   */
  selectedItem = computed(() => {
    const items = this.items();
    const index = this.selectedIndex();
    const fallback: MenuItem = {
      label: '',
      value: undefined,
      leftIcons: [],
      rightIcons: [],
      disabled: false,
    };
    const item = items[index] ?? items[0] ?? fallback;

    return {
      ...item,
      ...(this.menuTriggerIcons() ?? DEFAULT_MENU_TRIGGER_ICONS),
    };
  });

  /**
   * Right icons for the trigger: when default is chevron_down, shows chevron_down when closed
   * and chevron_up when open. Otherwise uses selectedItem().rightIcons as-is.
   */
  triggerRightIcons = computed(() => {
    const right = this.selectedItem().rightIcons ?? [];
    const open = this.isOpen();
    if (right.length === 1 && right[0] === 'chevron_down') {
      return open ? (['chevron_up'] as IconName[]) : (['chevron_down'] as IconName[]);
    }
    return right;
  });

  /**
   * Tracks whether the menu is currently open for ARIA.
   */
  isOpen = signal(false);

  /**
   * Stable id used to link the trigger to the menu container.
   */
  readonly menuId = `ul-dropdown-menu-${Math.random().toString(36).slice(2, 11)}`;

  /**
   * Emitted when a new item is selected from the dropdown.
   */
  selectedItemChange = output<MenuItem>();

  /**
   * Emitted when the menu closes, whether or not a selection was made —
   * the closest thing this component has to a "blur" for form controls
   * built on top of it (see ul-select's touch output).
   */
  closed = output<void>();

  private readonly trigger = viewChild(MenuTriggerComponent);

  /**
   * Handles the selection of a dropdown item.
   * @param index - The index of the selected item
   */
  handleItemTriggered(index: number) {
    this.selectedIndex.set(index);
    this.selectedItemChange.emit(this.items()[index]);
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
