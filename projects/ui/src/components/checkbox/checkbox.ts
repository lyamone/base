import { Component, computed, input, model } from '@angular/core';
import type {
  FormCheckboxControl,
  ValidationError,
  WithOptionalFieldTree,
} from '@angular/forms/signals';

import {
  createFormFieldIds,
  FormFieldHelperComponent,
  FormFieldLabelComponent,
  getFormFieldDescribedBy,
} from '../shared/form-field';
import type { UiCheckboxSize } from '../shared/ui-types';

export type CheckboxZoneType = 'none' | 'accessible' | 'visible' | 'checked-visible';

/**
 * Checkbox component. Implements FormCheckboxControl for Signal Forms [formField].
 * Use [(checked)] or [formField]="myForm().acceptTerms". No value property.
 * Uses shared form field label and helper for alignment with input, textarea, radio-group.
 */
@Component({
  selector: 'ul-checkbox',
  imports: [FormFieldLabelComponent, FormFieldHelperComponent],
  template: `
    <div
      class="ul-checkbox ul-checkbox--{{ size() }}"
      [class.ul-checkbox--accessible-zone]="zone() === 'accessible'"
      [class.ul-checkbox--visible-zone]="zone() === 'visible'"
      [class.ul-checkbox--checked-visible-zone]="zone() === 'checked-visible'"
      [class.ul-checkbox--error]="hasError()"
      [class.ul-checkbox--disabled]="disabled()"
      [class.ul-checkbox--required]="required()"
      [attr.aria-invalid]="hasError()"
      [attr.aria-required]="required()"
      [attr.aria-describedby]="describedBy()"
    >
      <ul-form-field-label
        [label]="label()"
        [required]="required()"
        [for]="ids.controlId"
        [size]="size() === 'sm' ? 'sm' : 'md'"
      />

      <label
        class="ul-checkbox__row"
        [class.ul-checkbox__row--accessible-zone]="zone() === 'accessible'"
        [class.ul-checkbox__row--visible-zone]="zone() === 'visible'"
        [class.ul-checkbox__row--checked-visible-zone]="zone() === 'checked-visible'"
        [class.ul-checkbox__row--sm]="size() === 'sm'"
        [class.ul-checkbox__row--lg]="size() === 'lg'"
        [class.ul-checkbox__row--error]="hasError()"
        [attr.for]="ids.controlId"
      >
        <input
          type="checkbox"
          class="ul-checkbox__input"
          [id]="ids.controlId"
          [checked]="checked()"
          [disabled]="disabled()"
          [indeterminate]="indeterminate()"
          [attr.aria-describedby]="describedBy()"
          [attr.aria-invalid]="hasError()"
          [attr.aria-required]="required()"
          (change)="onChange($event)"
        />
        <span class="ul-checkbox__pseudo-input"></span>
        <span class="ul-checkbox__label">
          <ng-content />
        </span>
      </label>

      <ul-form-field-helper
        [id]="ids.helperId"
        [helperText]="helperText()"
        [errorText]="resolvedErrorText()"
        [error]="hasError()"
      />
    </div>
  `,
  styleUrls: ['./checkbox.scss'],
})
export class CheckboxComponent implements FormCheckboxControl {
  checked = model<boolean>(false);

  disabled = model<boolean>(false);
  indeterminate = model<boolean>(false);
  zone = input<CheckboxZoneType>('none');
  size = input<UiCheckboxSize>('default');
  label = input<string | null>(null);
  helperText = input<string | null>(null);
  required = input<boolean>(false);
  error = input<boolean>(false);
  errorText = input<string | null>(null);
  invalid = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  protected readonly ids = createFormFieldIds('ul-checkbox');
  protected readonly hasError = computed(() => this.error() || this.invalid());

  protected readonly resolvedErrorText = computed(
    () =>
      this.errorText() ||
      (this.hasError() && this.errors().length ? (this.errors()[0]?.message ?? null) : null),
  );

  protected readonly describedBy = computed(() =>
    getFormFieldDescribedBy(
      this.ids.helperId,
      this.ids.errorId,
      !!this.helperText(),
      this.hasError(),
      !!this.resolvedErrorText(),
    ),
  );

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked.set(input.checked);
  }
}
