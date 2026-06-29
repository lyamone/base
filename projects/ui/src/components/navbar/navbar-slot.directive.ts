import { Directive } from '@angular/core';

/** Place on the element projected into [ul-navbar-logo] so the navbar can detect logo content. */
@Directive({
  selector: '[ul-navbar-logo]',
  standalone: true,
})
export class NavbarLogoSlotDirective {}

/** Place on the element projected into [ul-navbar-search] so the navbar can show the mobile search toggle. */
@Directive({
  selector: '[ul-navbar-search]',
  standalone: true,
})
export class NavbarSearchSlotDirective {}

/** Place on the element projected into [ul-navbar-avatar] so the navbar can detect avatar content. */
@Directive({
  selector: '[ul-navbar-avatar]',
  standalone: true,
})
export class NavbarAvatarSlotDirective {}
