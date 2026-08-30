import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Mobile-only bottom navigation bar, styled like an app's tab bar
 * (icon-above-label items, one highlighted as active). Hidden above the
 * 'md' breakpoint (1024px) by the component's own CSS — no wrapper class or
 * media query is needed in the consuming app.
 *
 * Project `ul-dock-item`s directly; there is no data-driven `items` input,
 * since each item typically needs its own `routerLink`.
 *
 * @example
 * <ul-dock>
 *   <ul-dock-item icon="home" label="Home" routerLink="/home" routerLinkActive="ul-dock-item--active" />
 *   <ul-dock-item icon="search" label="Search" routerLink="/search" routerLinkActive="ul-dock-item--active" />
 * </ul-dock>
 */
@Component({
  selector: 'ul-dock',
  templateUrl: './dock.html',
  styleUrls: ['./dock.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DockComponent {}
