import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  computed,
  input,
  signal,
  ViewEncapsulation,
  output,
} from '@angular/core';

import { AvatarComponent } from '../avatar/avatar';
import { ButtonComponent } from '../button/button';
import { IconComponent } from '../icon/icon';
import {
  NavbarAppNameSlotDirective,
  NavbarAvatarSlotDirective,
  NavbarLogoSlotDirective,
  NavbarSearchSlotDirective,
} from './navbar-slot.directive';

/** 'full' shows the sidebar toggle, search, and avatar; 'minimal' shows only the logo — for auth pages and other chromeless flows. See also `searchCollapsible` for whether the search slot collapses to an icon-toggle on mobile. */
export type NavbarVariant = 'full' | 'minimal';

@Component({
  selector: 'ul-navbar',
  standalone: true,
  imports: [AvatarComponent, ButtonComponent, IconComponent],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  /** 'full' (default) shows the sidebar toggle, search, and avatar; 'minimal' shows only the logo. */
  variant = input<NavbarVariant>('full');

  /** Default logo link href when logo slot is not projected. */
  logoHref = input<string>('/');

  /** Default logo image src when logo slot is not projected. */
  logoSrc = input<string | undefined>(undefined);

  /** Default logo image alt when logo slot is not projected. */
  logoAlt = input<string>('logo');

  /** Default avatar image src when avatar slot is not projected. */
  avatarSrc = input<string | undefined>(undefined);

  /** Default avatar initials when avatar slot is not projected and no image. */
  avatarInitials = input<string | undefined>(undefined);

  /** Default avatar image alt when avatar slot is not projected. */
  avatarAlt = input<string>('');

  /** For aria-expanded on the toggle button */
  sidebarOpen = input<boolean>(false);

  /** When true, show the sidebar toggle button even when a logo slot is projected. */
  showSidebarToggle = input<boolean>(false);

  /** When false, the projected search slot is always rendered expanded (no icon-toggle collapse on mobile) — use for apps that want search visible and full-width at every viewport. */
  searchCollapsible = input<boolean>(true);

  /** Emitted when the user clicks the sidebar toggle. Parent should flip the open state. */
  sidebarToggle = output<void>();

  readonly logoSlot = contentChild(NavbarLogoSlotDirective);
  readonly searchSlot = contentChild(NavbarSearchSlotDirective);
  readonly avatarSlot = contentChild(NavbarAvatarSlotDirective);
  readonly appNameSlot = contentChild(NavbarAppNameSlotDirective);

  readonly isMinimal = computed(() => this.variant() === 'minimal');

  readonly hasLogoSlot = computed(() => !!this.logoSlot());
  readonly hasSearchSlot = computed(() => !this.isMinimal() && !!this.searchSlot());
  readonly showSearchToggle = computed(() => this.hasSearchSlot() && this.searchCollapsible());
  readonly hasAvatarSlot = computed(() => !this.isMinimal() && !!this.avatarSlot());
  readonly hasAppNameSlot = computed(() => !this.hasLogoSlot() && !!this.appNameSlot());

  readonly showToggle = computed(
    () => !this.isMinimal() && (!this.hasLogoSlot() || this.showSidebarToggle()),
  );

  readonly searchExpanded = signal(false);

  toggleSearch(): void {
    this.searchExpanded.update((v) => !v);
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }
}
