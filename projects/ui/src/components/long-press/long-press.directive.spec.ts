import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { LongPressDirective } from './long-press.directive';

@Component({
  imports: [LongPressDirective],
  template: `<div ulLongPress (ulLongPress)="fired.push(undefined)">press me</div>`,
})
class HostComponent {
  readonly fired: undefined[] = [];
}

function setup() {
  TestBed.configureTestingModule({ imports: [HostComponent] });
  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  const el: HTMLElement = fixture.nativeElement.querySelector('div');
  return { fixture, el };
}

function pointerEvent(type: string, x = 0, y = 0, pointerType = 'touch'): PointerEvent {
  return new PointerEvent(type, { clientX: x, clientY: y, pointerType, bubbles: true });
}

describe('LongPressDirective', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('emits ulLongPress after the press threshold elapses', () => {
    const { fixture, el } = setup();

    el.dispatchEvent(pointerEvent('pointerdown'));
    vi.advanceTimersByTime(500);

    expect(fixture.componentInstance.fired.length).toBe(1);
  });

  it('does not emit when the pointer is released before the threshold', () => {
    const { fixture, el } = setup();

    el.dispatchEvent(pointerEvent('pointerdown'));
    vi.advanceTimersByTime(300);
    el.dispatchEvent(pointerEvent('pointerup'));
    vi.advanceTimersByTime(300);

    expect(fixture.componentInstance.fired.length).toBe(0);
  });

  it('does not emit when the pointer moves past the cancel threshold', () => {
    const { fixture, el } = setup();

    el.dispatchEvent(pointerEvent('pointerdown', 0, 0));
    el.dispatchEvent(pointerEvent('pointermove', 50, 50));
    vi.advanceTimersByTime(500);

    expect(fixture.componentInstance.fired.length).toBe(0);
  });

  it('suppresses the click that follows a triggering press', () => {
    const { el } = setup();

    el.dispatchEvent(pointerEvent('pointerdown'));
    vi.advanceTimersByTime(500);

    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    const prevented = !el.dispatchEvent(click);

    expect(prevented).toBe(true);
  });
});
