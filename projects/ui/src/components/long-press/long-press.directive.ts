import { Directive, input, output } from '@angular/core';

const DEFAULT_DURATION_MS = 500;
const MOVE_CANCEL_THRESHOLD_PX = 10;

/**
 * Emits `ulLongPress` when the pointer (mouse, touch, or pen) is held down
 * on the host element for `ulLongPressDuration` without moving more than a
 * few pixels. Also suppresses the `click` that follows the triggering
 * press's release, so long-press-to-select gestures don't also activate a
 * link/button underneath.
 */
@Directive({
  selector: '[ulLongPress]',
  host: {
    '(pointerdown)': 'handlePointerDown($event)',
    '(pointerup)': 'handlePointerEnd()',
    '(pointercancel)': 'handlePointerEnd()',
    '(pointerleave)': 'handlePointerEnd()',
    '(pointermove)': 'handlePointerMove($event)',
    '(click)': 'handleClick($event)',
  },
})
export class LongPressDirective {
  ulLongPressDuration = input<number>(DEFAULT_DURATION_MS);

  ulLongPress = output<void>();

  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private startX = 0;
  private startY = 0;
  private triggered = false;

  handlePointerDown(event: PointerEvent): void {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    this.startX = event.clientX;
    this.startY = event.clientY;
    this.triggered = false;
    this.timeoutId = setTimeout(() => {
      this.timeoutId = null;
      this.triggered = true;
      this.ulLongPress.emit();
    }, this.ulLongPressDuration());
  }

  handlePointerMove(event: PointerEvent): void {
    if (this.timeoutId === null) return;

    const distance = Math.hypot(event.clientX - this.startX, event.clientY - this.startY);
    if (distance > MOVE_CANCEL_THRESHOLD_PX) {
      this.cancelTimer();
    }
  }

  handlePointerEnd(): void {
    this.cancelTimer();
  }

  handleClick(event: MouseEvent): void {
    if (!this.triggered) return;
    this.triggered = false;
    event.preventDefault();
    event.stopPropagation();
  }

  private cancelTimer(): void {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
