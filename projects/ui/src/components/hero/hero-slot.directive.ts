import { Directive } from '@angular/core';

/** Place on the element projected into [ul-hero-badges] so the hero can detect custom badges content. */
@Directive({
  selector: '[ul-hero-badges]',
})
export class PeHeroBadgesSlotDirective {}

/** Place on the element projected into [ul-hero-title] so the hero can detect custom title content. */
@Directive({
  selector: '[ul-hero-title]',
})
export class PeHeroTitleSlotDirective {}

/** Place on the element projected into [ul-hero-subtitle] so the hero can detect custom subtitle content. */
@Directive({
  selector: '[ul-hero-subtitle]',
})
export class PeHeroSubtitleSlotDirective {}

/** Place on the element projected into [ul-hero-actions] so the hero can detect custom actions content. */
@Directive({
  selector: '[ul-hero-actions]',
})
export class PeHeroActionsSlotDirective {}

/** Place on the element projected into [ul-hero-content] for optional extra content (e.g. between subtitle and actions). */
@Directive({
  selector: '[ul-hero-content]',
})
export class PeHeroContentSlotDirective {}
