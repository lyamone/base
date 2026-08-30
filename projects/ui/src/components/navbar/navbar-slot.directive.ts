import { Directive } from '@angular/core';

/** Place on the element projected into [ul-navbar-logo] so the navbar can detect logo content. */
@Directive({
  selector: '[ul-navbar-logo]',
})
export class NavbarLogoSlotDirective {}

/** Place on the element projected into [ul-navbar-search] so the navbar can show the mobile search toggle. */
@Directive({
  selector: '[ul-navbar-search]',
})
export class NavbarSearchSlotDirective {}

/** Place on the element projected into [ul-navbar-avatar] so the navbar can detect avatar content. */
@Directive({
  selector: '[ul-navbar-avatar]',
})
export class NavbarAvatarSlotDirective {}

/** Place on the element projected into [ul-navbar-app-name] so the navbar can detect app-name content. Only rendered when a logo slot is not projected (it sits next to the default logo image). */
@Directive({
  selector: '[ul-navbar-app-name]',
})
export class NavbarAppNameSlotDirective {}
