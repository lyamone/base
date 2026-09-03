import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render its trigger', () => {
    const trigger = fixture.nativeElement.querySelector('ul-menu-trigger');
    expect(trigger).toBeTruthy();
  });

  it('should emit the triggered item on itemSelected', () => {
    fixture.componentRef.setInput('items', [
      { label: 'Edit', value: 'edit' },
      { label: 'Delete', value: 'delete' },
    ]);
    fixture.detectChanges();
    const emitted: unknown[] = [];
    component.itemSelected.subscribe((item) => emitted.push(item));

    component.handleItemTriggered(1);

    expect(emitted).toEqual([{ label: 'Delete', value: 'delete' }]);
  });

  it('should track isOpen and emit closed on menu close', () => {
    const emitted: void[] = [];
    component.closed.subscribe(() => emitted.push(undefined));

    component.onMenuOpened();
    expect(component.isOpen()).toBe(true);

    component.onMenuClosed();
    expect(component.isOpen()).toBe(false);
    expect(emitted).toHaveLength(1);
  });
});

@Component({
  imports: [MenuComponent],
  template: `<ul-menu><span>Custom item</span></ul-menu>`,
})
class HostComponent {}

describe('MenuComponent content projection', () => {
  // The projected content lives inside the lazily-instantiated
  // `<ng-template #menu>`, only materialized into the CDK overlay once the
  // trigger opens it — so this only checks that projecting custom content
  // compiles and renders without error, not that it appears on open (that's
  // an integration/e2e concern, not a unit one, given the overlay attaches
  // outside the fixture's own DOM).
  it('should accept projected content without erroring', async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    const hostFixture = TestBed.createComponent(HostComponent);
    expect(() => hostFixture.detectChanges()).not.toThrow();
  });
});
