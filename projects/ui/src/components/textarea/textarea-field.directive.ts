import { Directive } from '@angular/core';

/**
 * When projected into ul-textarea, replaces the native textarea with custom content (e.g. Quill).
 * Use with [ul-textarea-field] on the element to project.
 */
@Directive({
  selector: '[ul-textarea-field]',
  standalone: true,
})
export class TextareaFieldDirective {}
