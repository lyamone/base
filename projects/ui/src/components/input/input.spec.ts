import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Regression: pattern defaults to an empty array, and [attr.pattern] used
  // to stringify that to "" instead of omitting the attribute. A native
  // pattern="" only matches the empty string, so every non-empty value
  // failed native constraint validation as soon as this input sat inside a
  // real <form> without novalidate.
  it('should not render a native pattern attribute when no pattern is set', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    fixture.componentRef.setInput('value', 'a perfectly normal value');
    fixture.detectChanges();

    expect(input.hasAttribute('pattern')).toBe(false);
    expect(input.validity.patternMismatch).toBe(false);
  });

  it('should combine multiple patterns into a single alternation on the native attribute', () => {
    fixture.componentRef.setInput('pattern', [/^foo$/, /^bar$/]);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('pattern')).toBe('^foo$|^bar$');
  });
});
