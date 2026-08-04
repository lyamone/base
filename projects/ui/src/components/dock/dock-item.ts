import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { IconComponent, type IconName } from '../icon/icon';
import { DockItemContentSlotDirective } from './dock-item-slot.directive';

/** Pre-built visual treatments for a dock item. 'accent' raises/highlights the item (e.g. a primary action tab like "New"). */
export type DockItemVariant = 'default' | 'accent';

/**
 * A single tab in a `ul-dock`. Renders an icon above a label and tints both
 * when `active`. Attach `routerLink`/`routerLinkActive` (or any other
 * directive) directly on `ul-dock-item` for navigation.
 *
 * For the common case, content is data-driven via `icon`/`label`. To fully
 * customize an item's content (e.g. a differently laid-out icon+label pair),
 * project it with `[ul-dock-item-content]` — this replaces the default
 * icon/label rendering entirely. `badge` and `variant` apply regardless of
 * which content path is used.
 *
 * @example
 * <ul-dock-item icon="home" label="Home" routerLink="/home" routerLinkActive="ul-dock-item--active" />
 * <ul-dock-item icon="bell_on" badge="3" routerLink="/notifications" />
 * <ul-dock-item variant="accent" routerLink="/listings/new">
 *   <span ul-dock-item-content>
 *     <ul-icon icon="plus" size="6" />
 *     <span class="ul-dock-item__label">New</span>
 *   </span>
 * </ul-dock-item>
 */
@Component({
  selector: 'ul-dock-item',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './dock-item.html',
  styleUrls: ['./dock-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DockItemComponent {
  icon = input<IconName>();
  label = input<string>('');
  active = input<boolean>(false);
  disabled = input<boolean>(false);
  badge = input<string | number>();
  variant = input<DockItemVariant>('default');

  readonly contentSlot = contentChild(DockItemContentSlotDirective);
  readonly hasContentSlot = computed(() => !!this.contentSlot());
}
