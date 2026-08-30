import { Component, computed, input, model, output, signal } from '@angular/core';
import type {
  FormValueControl,
  ValidationError,
  WithOptionalFieldTree,
} from '@angular/forms/signals';

import { ButtonComponent } from '../button/button';
import { IconComponent } from '../icon/icon';
import {
  createFormFieldIds,
  FormFieldHelperComponent,
  FormFieldLabelComponent,
  getFormFieldDescribedBy,
} from '../shared/form-field';
import type { UiSize } from '../shared/ui-types';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';

/** Border and hover style: border-only (hover = border only), subtle-tint (hover = border + 5% fill). */
export type InputAppearance = 'border-only' | 'subtle-tint';

/**
 * A reusable input component that follows UDS design system guidelines.
 * Implements FormValueControl for use with Signal Forms [formField] directive.
 *
 * Use [(value)] for two-way binding, or bind with [formField]="myForm().email" for Signal Forms.
 *
 * Content projection: [ul-input-left-elements], [ul-input-right-elements].
 */
@Component({
  selector: 'ul-input',
  imports: [FormFieldLabelComponent, FormFieldHelperComponent, ButtonComponent, IconComponent],
  templateUrl: './input.html',
  styleUrls: ['./input.scss'],
})
export class InputComponent implements FormValueControl<string> {
  readonly type = input<InputType>('text');
  readonly size = input<UiSize>('md');
  /** Border/hover style: border-only (hover = border only), subtle-tint (hover = border + 5% fill). */
  readonly appearance = input<InputAppearance>('border-only');
  readonly error = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly readOnly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly placeholder = input<string>('');
  readonly label = input<string | null>(null);
  readonly helperText = input<string | null>(null);
  readonly errorText = input<string | null>(null);
  readonly maxLength = input<number | undefined>();
  readonly minLength = input<number | undefined>();
  readonly pattern = input<readonly RegExp[]>([]);
  /** Native step for type="number". Defaults to 'any' (decimals allowed) rather than the
   * browser's own default of 1, which would silently reject e.g. "19.99" — pass an explicit
   * step (e.g. 1) to restrict to whole numbers. */
  readonly step = input<number | 'any' | undefined>(undefined);
  readonly autocomplete = input<string>('off');
  /** When provided (e.g. by a parent form field), the input element uses this id instead of the internal one. */
  readonly controlId = input<string | undefined>();
  /** Aria-label for the toggle button when the password is hidden (i.e. the action reveals it). */
  readonly showPasswordLabel = input<string>('Show password');
  /** Aria-label for the toggle button when the password is visible (i.e. the action hides it). */
  readonly hidePasswordLabel = input<string>('Hide password');

  /** FormUiControl optional: bound by [formField] when invalid */
  readonly invalid = input<boolean>(false);
  /** FormUiControl optional: bound by [formField] for validation errors */
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  /** FormUiControl optional: control sets on blur */
  readonly touched = model<boolean>(false);
  /** FormUiControl optional: [formField] listens to this to mark the bound field touched on blur */
  readonly touch = output<void>();

  readonly value = model<string>('');

  protected readonly ids = createFormFieldIds('ul-input');
  protected readonly effectiveControlId = computed(() => this.controlId() ?? this.ids.controlId);
  protected readonly effectiveHelperId = computed(() =>
    this.controlId() ? `${this.controlId()}-helper` : this.ids.helperId,
  );
  protected readonly effectiveErrorId = computed(() =>
    this.controlId() ? `${this.controlId()}-error` : this.ids.errorId,
  );
  protected readonly isFocused = signal(false);
  protected readonly hasError = computed(() => this.error() || this.invalid());

  // [attr.pattern]="pattern()" would stringify an empty array to "" instead
  // of omitting the attribute — an empty native pattern matches only the
  // empty string, so every non-empty value would fail native validation.
  // Native <input pattern> only accepts one regex source, so multiple
  // patterns are combined as alternatives.
  protected readonly nativePattern = computed<string | null>(() => {
    const patterns = this.pattern();
    return patterns.length ? patterns.map((p) => p.source).join('|') : null;
  });

  protected readonly nativeStep = computed<number | 'any' | null>(() => {
    const step = this.step();
    if (step !== undefined) return step;
    return this.type() === 'number' ? 'any' : null;
  });

  protected readonly isPasswordType = computed(() => this.type() === 'password');

  protected readonly passwordRevealed = signal(false);
  protected readonly effectiveType = computed(() =>
    this.isPasswordType() && this.passwordRevealed() ? 'text' : this.type(),
  );
  protected readonly passwordToggleIcon = computed(() =>
    this.passwordRevealed() ? 'eye_on' : 'eye_dashed',
  );
  protected readonly passwordToggleLabel = computed(() =>
    this.passwordRevealed() ? this.hidePasswordLabel() : this.showPasswordLabel(),
  );

  protected readonly describedBy = computed(() =>
    getFormFieldDescribedBy(
      this.effectiveHelperId(),
      this.effectiveErrorId(),
      !!this.helperText(),
      this.hasError(),
      !!this.errorText() || this.errors().length > 0,
    ),
  );

  // Outputs
  readonly inputBlur = output<FocusEvent>();
  readonly inputFocus = output<FocusEvent>();
  /** Emitted when Enter is pressed in the field; typically used to submit a form. */
  readonly inputEnter = output<KeyboardEvent>();

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
  }

  onBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.touched.set(true);
    this.touch.emit();
    this.inputBlur.emit(event);
  }

  onFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.inputFocus.emit(event);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.inputEnter.emit(event);
    }
  }

  togglePasswordVisibility(): void {
    this.passwordRevealed.update((revealed) => !revealed);
  }

  /**
   * Programmatically focuses the input element
   */
  focus(): void {
    const inputEl = document.getElementById(this.effectiveControlId()) as HTMLInputElement;
    inputEl?.focus();
  }

  select(): void {
    const inputEl = document.getElementById(this.effectiveControlId()) as HTMLInputElement;
    inputEl?.select();
  }
}
