import { CdkMenu } from '@angular/cdk/menu';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItem, MenuItemsComponent } from './menu-items';

// cdkMenuItem (used internally) requires an ancestor providing CDK's
// MENU_STACK token — normally supplied by the cdkMenu div that ul-menu /
// ul-dropdown wrap this component in. A host wrapper reproduces that.
@Component({
  imports: [CdkMenu, MenuItemsComponent],
  template: `
    <div cdkMenu>
      <ul-menu-items
        [items]="items"
        [selectedIndex]="selectedIndex"
        (itemTriggered)="onTriggered($event)"
      />
    </div>
  `,
})
class HostComponent {
  items: MenuItem[] = [];
  selectedIndex: number | null = null;
  readonly triggered: number[] = [];

  onTriggered(index: number): void {
    this.triggered.push(index);
  }
}

describe('MenuItemsComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render one row per item', () => {
    fixture.componentInstance.items = [{ label: 'Edit' }, { label: 'Delete' }];
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('ul-list-item');
    expect(rows.length).toBe(2);
  });

  it('should emit the row index when a row is triggered', () => {
    fixture.componentInstance.items = [{ label: 'Edit' }, { label: 'Delete' }];
    fixture.detectChanges();

    (fixture.nativeElement.querySelectorAll('ul-list-item')[1] as HTMLElement)
      .querySelector('button')
      ?.click();

    expect(fixture.componentInstance.triggered).toEqual([1]);
  });

  it('should render menuitem role with no aria-checked when selectedIndex is null', () => {
    fixture.componentInstance.items = [{ label: 'Edit' }];
    fixture.detectChanges();

    const row = fixture.nativeElement.querySelector('ul-list-item');
    expect(row.getAttribute('role')).toBe('menuitem');
    expect(row.getAttribute('aria-checked')).toBeNull();
  });

  it('should render menuitemradio role and mark the selected index as checked', () => {
    fixture.componentInstance.items = [{ label: 'A' }, { label: 'B' }];
    fixture.componentInstance.selectedIndex = 1;
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('ul-list-item');
    expect(rows[0].getAttribute('role')).toBe('menuitemradio');
    expect(rows[0].getAttribute('aria-checked')).toBe('false');
    expect(rows[1].getAttribute('aria-checked')).toBe('true');
  });
});
