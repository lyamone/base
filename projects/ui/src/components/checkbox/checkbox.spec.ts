import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hides the required asterisk when showRequiredIndicator is false', () => {
    fixture.componentRef.setInput('label', 'Accept terms');
    fixture.componentRef.setInput('required', true);
    fixture.componentRef.setInput('showRequiredIndicator', false);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.ul-form-field__required-indicator')).toBeFalsy();
  });
});
