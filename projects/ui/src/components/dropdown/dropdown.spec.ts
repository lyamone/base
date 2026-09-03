import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should default the selected item to the first item', () => {
    fixture.componentRef.setInput('items', [{ label: 'First' }, { label: 'Second' }]);
    fixture.detectChanges();

    expect(component.selectedItem().label).toBe('First');
  });

  it('should update the selected item and emit selectedItemChange when an item is triggered', () => {
    fixture.componentRef.setInput('items', [{ label: 'First' }, { label: 'Second' }]);
    fixture.detectChanges();
    const emitted: unknown[] = [];
    component.selectedItemChange.subscribe((item) => emitted.push(item));

    component.handleItemTriggered(1);

    expect(component.selectedIndex()).toBe(1);
    expect(component.selectedItem().label).toBe('Second');
    expect(emitted).toEqual([{ label: 'Second' }]);
  });

  it('should fall back to the default chevron when menuTriggerIcons is explicitly bound to undefined', () => {
    // Angular's input() default only applies when the input is never bound —
    // an explicit binding that resolves to undefined (e.g. an unset story
    // arg, or a consumer's own optional config) still overrides it, so the
    // component itself must guard against that rather than relying on the
    // input's declared default.
    fixture.componentRef.setInput('items', [{ label: 'First', rightIcons: ['activity'] }]);
    fixture.componentRef.setInput('menuTriggerIcons', undefined);
    fixture.detectChanges();

    expect(component.selectedItem().rightIcons).toEqual(['chevron_down']);
  });

  it('should flip the default chevron between closed and open states', () => {
    fixture.detectChanges();
    expect(component.triggerRightIcons()).toEqual(['chevron_down']);

    component.onMenuOpened();
    expect(component.triggerRightIcons()).toEqual(['chevron_up']);

    component.onMenuClosed();
    expect(component.triggerRightIcons()).toEqual(['chevron_down']);
  });

  it('should emit closed when the menu closes', () => {
    fixture.detectChanges();
    const emitted: void[] = [];
    component.closed.subscribe(() => emitted.push(undefined));

    component.onMenuOpened();
    component.onMenuClosed();

    expect(emitted).toHaveLength(1);
  });
});
