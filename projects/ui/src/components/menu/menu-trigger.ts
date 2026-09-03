import { CdkMenuTrigger } from '@angular/cdk/menu';
import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output, TemplateRef, viewChild } from '@angular/core';

import { ButtonComponent } from '../button/button';
import { IconComponent, IconName } from '../icon/icon';
import { ListItemComponent, ListItemTheme } from '../list-item/list-item';

/**
 * The trigger button shared by `ul-dropdown` and `ul-menu`: either an
 * icon-only button (`iconOnly`, e.g. a "more options" `⋮`) or a
 * `ul-list-item`-styled button showing a label with optional icons on
 * either side. Wires `cdkMenuTriggerFor` plus the ARIA attributes a menu
 * trigger needs, and exposes `close()` so the panel it opens can be
 * dismissed programmatically (e.g. a tap on a mobile bottom-sheet backdrop,
 * which CDK's own outside-click handling won't catch since the backdrop
 * lives inside the same overlay pane).
 */
@Component({
  selector: 'ul-menu-trigger',
  imports: [CdkMenuTrigger, NgTemplateOutlet, ButtonComponent, ListItemComponent, IconComponent],
  template: `
    <ng-template #renderIcons let-icons>
      @for (icon of icons; track icon) {
        <ul-icon size="5" [icon]="icon" />
      }
    </ng-template>

    @if (iconOnly(); as iconName) {
      <ul-button
        [theme]="theme()"
        [iconOnly]="true"
        [disabled]="disabled()"
        [cdkMenuTriggerFor]="menuTemplate()"
        class="ul-menu-trigger"
        aria-haspopup="menu"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-controls]="menuId()"
        [attr.aria-label]="iconOnlyLabel()"
        (cdkMenuOpened)="opened.emit()"
        (cdkMenuClosed)="closed.emit()"
      >
        <ul-icon [icon]="iconName" />
      </ul-button>
    } @else {
      <ul-list-item
        [theme]="theme()"
        [disabled]="disabled()"
        [cdkMenuTriggerFor]="menuTemplate()"
        class="ul-menu-trigger"
        aria-haspopup="menu"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-controls]="menuId()"
        (cdkMenuOpened)="opened.emit()"
        (cdkMenuClosed)="closed.emit()"
      >
        <ng-container ul-list-item-before-label>
          <ng-container *ngTemplateOutlet="renderIcons; context: { $implicit: leftIcons() }" />
        </ng-container>
        <ng-container ul-list-item-label>{{ label() }}</ng-container>
        <ng-container ul-list-item-after-label>
          <ng-container *ngTemplateOutlet="renderIcons; context: { $implicit: rightIcons() }" />
        </ng-container>
      </ul-list-item>
    }
  `,
})
export class MenuTriggerComponent {
  theme = input<ListItemTheme>('ghost-white');
  disabled = input(false);
  iconOnly = input<IconName>();
  iconOnlyLabel = input('Open menu');
  label = input('');
  leftIcons = input<IconName[]>([]);
  rightIcons = input<IconName[]>([]);
  menuTemplate = input.required<TemplateRef<unknown>>();
  menuId = input.required<string>();
  isOpen = input(false);

  opened = output<void>();
  closed = output<void>();

  private readonly trigger = viewChild(CdkMenuTrigger);

  close(): void {
    this.trigger()?.close();
  }
}
