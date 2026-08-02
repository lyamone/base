import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconComponent, type IconName } from '../icon/icon';

/**
 * A single tab in a `ul-dock`. Renders an icon above a label and tints both
 * when `active`. Attach `routerLink`/`routerLinkActive` (or any other
 * directive) directly on `ul-dock-item` for navigation — it has no
 * projection slots of its own, since its content (icon + label) is fully
 * data-driven via inputs.
 *
 * @example
 * <ul-dock-item icon="home" label="Home" [active]="true" routerLink="/home" />
 */
@Component({
  selector: 'ul-dock-item',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './dock-item.html',
  styleUrls: ['./dock-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockItemComponent {
  icon = input.required<IconName>();
  label = input<string>('');
  active = input<boolean>(false);
  disabled = input<boolean>(false);
}
