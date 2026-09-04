import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldLabelComponent } from './form-field-label';

describe('FormFieldLabelComponent', () => {
  let component: FormFieldLabelComponent;
  let fixture: ComponentFixture<FormFieldLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldLabelComponent);
    component = fixture.componentInstance;
  });

  function setLabel(): void {
    fixture.componentRef.setInput('label', 'Email');
  }

  it('renders nothing when there is no label', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('label')).toBeFalsy();
  });

  it('does not render the asterisk when not required', () => {
    setLabel();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain('*');
  });

  it('renders the asterisk by default when required', () => {
    setLabel();
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ul-form-field__required-indicator')).toBeTruthy();
  });

  it('hides the asterisk when required but showRequiredIndicator is false', () => {
    setLabel();
    fixture.componentRef.setInput('required', true);
    fixture.componentRef.setInput('showRequiredIndicator', false);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ul-form-field__required-indicator')).toBeFalsy();
  });

  it('keeps the --required label styling even when the asterisk itself is hidden', () => {
    // showRequiredIndicator only toggles the visible "*" — the --required
    // modifier class is a separate styling hook and stays on regardless, so
    // a caller hiding the asterisk (e.g. every field on a form is required
    // by convention) doesn't lose other required-driven styling.
    setLabel();
    fixture.componentRef.setInput('required', true);
    fixture.componentRef.setInput('showRequiredIndicator', false);
    fixture.detectChanges();

    const label: HTMLElement = fixture.nativeElement.querySelector('label');
    expect(label.classList.contains('ul-form-field__label--required')).toBe(true);
  });
});
