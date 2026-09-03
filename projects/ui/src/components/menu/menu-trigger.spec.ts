import { Component, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MenuTriggerComponent } from './menu-trigger';

@Component({
  imports: [MenuTriggerComponent],
  template: `
    <ul-menu-trigger
      [iconOnly]="iconOnly"
      [label]="label"
      [menuTemplate]="menu"
      [menuId]="'test-menu'"
      (opened)="opened.push(undefined)"
      (closed)="closed.push(undefined)"
    />
    <ng-template #menu>
      <div>content</div>
    </ng-template>
  `,
})
class HostComponent {
  iconOnly: string | undefined = undefined;
  label = 'Actions';
  readonly opened: undefined[] = [];
  readonly closed: undefined[] = [];

  readonly trigger = viewChild.required(MenuTriggerComponent);
}

// Each test creates its own fixture with `iconOnly` already set before the
// first detectChanges() — this project's zoneless change detection doesn't
// reliably re-propagate a later mutation of a plain (non-signal) host
// property into a child's signal input on a second detectChanges() call.
function setup(iconOnly?: string) {
  TestBed.configureTestingModule({ imports: [HostComponent] });
  const fixture = TestBed.createComponent(HostComponent);
  fixture.componentInstance.iconOnly = iconOnly;
  fixture.detectChanges();
  return fixture;
}

describe('MenuTriggerComponent', () => {
  it('should create', () => {
    const fixture = setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a labeled ul-list-item trigger when iconOnly is not set', () => {
    const fixture = setup();

    expect(fixture.nativeElement.querySelector('ul-list-item')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('ul-button')).toBeFalsy();
    expect(fixture.nativeElement.textContent).toContain('Actions');
  });

  it('should render an icon-only ul-button trigger when iconOnly is set', () => {
    const fixture = setup('more_options');

    expect(fixture.nativeElement.querySelector('ul-button')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('ul-list-item')).toBeFalsy();
  });

  it('should not throw when close() is called before the menu has ever opened', () => {
    const fixture = setup();

    expect(() => fixture.componentInstance.trigger().close()).not.toThrow();
  });
});
