import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from '../checkbox/checkbox';

import { ListItemComponent } from './list-item';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render its button with type="button" so it never submits a parent form', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.type).toBe('button');
  });
});

@Component({
  imports: [ListItemComponent, CheckboxComponent],
  template: `
    <ul-list-item>
      <ng-container ul-list-item-before-label>
        <ul-checkbox [checked]="checked" />
      </ng-container>
      <ng-container ul-list-item-label>Row</ng-container>
    </ul-list-item>
  `,
})
class HostWithCheckboxComponent {
  checked = false;
}

describe('ListItemComponent with a projected checkbox', () => {
  function setup(checked: boolean) {
    TestBed.configureTestingModule({ imports: [HostWithCheckboxComponent] });
    const fixture = TestBed.createComponent(HostWithCheckboxComponent);
    fixture.componentInstance.checked = checked;
    fixture.detectChanges();
    return fixture;
  }

  it('does not apply the selected class when the projected checkbox is unchecked', () => {
    const fixture = setup(false);
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('ul-list-item--selected')).toBe(false);
  });

  it('applies the selected class when the projected checkbox is checked', () => {
    const fixture = setup(true);
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('ul-list-item--selected')).toBe(true);
  });
});
