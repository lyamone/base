import { Directive } from '@angular/core';

/** Place on the element projected into [ul-dock-item-content] so the dock item renders custom content instead of its default icon+label. */
@Directive({
  selector: '[ul-dock-item-content]',
})
export class DockItemContentSlotDirective {}
