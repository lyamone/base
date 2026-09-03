import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { moduleMetadata } from '@storybook/angular';
import { map } from 'rxjs';

import { Meta, StoryObj } from '../../../.storybook/types';
import { CheckboxComponent } from '../checkbox/checkbox';
import { IconComponent } from '../icon/icon';
import { LongPressDirective } from '../long-press/long-press.directive';

import { ListItemComponent } from './list-item';

interface DemoListing {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
}

const DEMO_LISTINGS: DemoListing[] = [
  {
    id: 1,
    title: 'PS5 console, barely used',
    price: '$349',
    imageUrl: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=200&h=200&fit=crop',
  },
  {
    id: 2,
    title: 'Mechanical keyboard, RGB',
    price: '$79',
    imageUrl: 'https://images.unsplash.com/photo-1511882150382-421056eb6909?w=200&h=200&fit=crop',
  },
  {
    id: 3,
    title: 'Racing wheel + pedals',
    price: '$210',
    imageUrl: 'https://images.unsplash.com/photo-1585504198199-20277593b94f?w=200&h=200&fit=crop',
  },
];

/**
 * Mobile (coarse pointer / no hover): long-press selects a row and swaps its
 * thumbnail for a large checkbox in the same slot — there's no room for both
 * on a small card, and a big checkbox is far easier to hit than a small one
 * overlaid on a thumbnail.
 *
 * Desktop (fine pointer + real hover): the checkbox is always present but
 * invisible until the row is hovered, keyboard-focused, or already checked —
 * Gmail-list style. No long-press needed there; a mouse has room for a
 * precise, always-available target.
 */
@Component({
  selector: 'ul-listing-selectable-demo',
  imports: [CheckboxComponent, LongPressDirective],
  template: `
    <div
      style="min-height: 320px; padding: 1.5rem; background: var(--color-background-main, #0a0a0a);"
    >
      <div style="max-width: 420px; display: flex; flex-direction: column; gap: 12px;">
        <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 0;">
          Resize the viewport (or use Storybook's device toolbar) to see both modes. Fine-pointer /
          real-hover viewports: hover a row to reveal its checkbox, Gmail-style — no long-press
          needed. Coarse-pointer / no-hover viewports: long-press (or mouse-click-and-hold ~500ms) a
          row — it swaps the thumbnail for a large checkbox and enters selection mode for every row.
        </p>
        <ul-checkbox
          [checked]="allSelected()"
          [indeterminate]="someSelected()"
          (checkedChange)="toggleSelectAll($event)"
        >
          Select all
        </ul-checkbox>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          @for (listing of listings; track listing.id) {
            <div
              class="listing-row"
              [class.ul-selectable-row]="isSelected(listing.id)"
              ulLongPress
              (ulLongPress)="select(listing.id)"
            >
              @if (selectionMode()) {
                <ul-checkbox
                  size="lg"
                  [checked]="isSelected(listing.id)"
                  (checkedChange)="setSelected(listing.id, $event)"
                />
              } @else {
                <img [src]="listing.imageUrl" alt="" class="listing-row__thumb" />
              }
              <div class="listing-row__info">
                <p class="listing-row__title">{{ listing.title }}</p>
                <p class="listing-row__price">{{ listing.price }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .listing-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 4px;
        border-radius: 8px;
      }
      .listing-row__thumb {
        width: 48px;
        height: 48px;
        flex-shrink: 0;
        border-radius: 6px;
        object-fit: cover;
      }
      .listing-row__hover-checkbox {
        opacity: 0;
        transition: opacity 150ms ease;
      }
      .listing-row:hover .listing-row__hover-checkbox,
      .listing-row:focus-within .listing-row__hover-checkbox,
      .listing-row:has(.ul-checkbox__input:checked) .listing-row__hover-checkbox {
        opacity: 1;
      }
      .listing-row__info {
        min-width: 0;
        flex: 1;
      }
      .listing-row__title {
        margin: 0;
        color: #ffffff;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .listing-row__price {
        margin: 0;
        color: rgba(255, 255, 255, 0.7);
        font-size: 13px;
      }
    `,
  ],
})
class ListingSelectableDemoComponent {
  readonly listings = DEMO_LISTINGS;

  private readonly hasFinePointer = toSignal(
    inject(BreakpointObserver)
      .observe('(hover: hover) and (pointer: fine)')
      .pipe(map((state) => state.matches)),
    { initialValue: true },
  );
  readonly isCompact = computed(() => !this.hasFinePointer());

  private readonly selectedIds = signal<ReadonlySet<number>>(new Set());
  readonly selectionMode = computed(() => this.selectedIds().size > 0);
  readonly allSelected = computed(() => this.listings.every((item) => this.isSelected(item.id)));
  readonly someSelected = computed(() => this.selectionMode() && !this.allSelected());

  isSelected(id: number): boolean {
    return this.selectedIds().has(id);
  }

  select(id: number): void {
    this.setSelected(id, true);
  }

  setSelected(id: number, value: boolean): void {
    this.selectedIds.update((current) => {
      const next = new Set(current);
      if (value) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }

  toggleSelectAll(checked: boolean): void {
    this.selectedIds.set(checked ? new Set(this.listings.map((item) => item.id)) : new Set());
  }
}

const meta: Meta<ListItemComponent> = {
  title: 'Components/Data Display/List Item',
  component: ListItemComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Single row item for lists and menus. Project label and optional before/after content (icons, checkboxes). Themes: ghost-white, transparent-white, outline-white, outline-purple. Used inside ul-dropdown and ul-select. For a bulk-select list (checkboxes gated behind a selection, long-press to enter it), pair it with the ulLongPress directive and the .ul-selectable-row utility class — see the SelectableList story.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [IconComponent, CheckboxComponent, ListingSelectableDemoComponent],
    }),
  ],
  argTypes: {
    theme: {
      control: 'select',
      options: ['ghost-white', 'transparent-white', 'outline-white', 'outline-purple'],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
      description: 'Show skeleton overlay while loading',
    },
  },
};

export default meta;
type Story = StoryObj<ListItemComponent>;

export const Basic: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 400px">
        <ul-list-item [theme]="theme" [disabled]="disabled" [loading]="loading">
          <ng-container ul-list-item-label>Basic List Item</ng-container>
        </ul-list-item>
      </div>
    `,
  }),
};

export const WithBeforeAndAfterContent: Story = {
  render: () => ({
    template: `
    <div style="max-width: 400px">
      <ul-list-item>
        <ng-container ul-list-item-before-label>
          <ul-checkbox />
          <ul-icon size="5" icon="placeholder" />
          <ul-icon size="5" icon="ultra_games" />
        </ng-container>
        <ng-container ul-list-item-label>Basic List Item</ng-container>
        <ng-container ul-list-item-after-label>
          <span>+80</span>
          <ul-icon size="5" icon="ultra_marketplace" />
          <ul-icon size="5" icon="placeholder" />
        </ng-container>
      </ul-list-item>
    </div>
    `,
  }),
};

/**
 * Bulk-select pattern for a real listing row (thumbnail + title + price),
 * built from ulLongPress + the .ul-selectable-row utility class. Desktop
 * (fine pointer, real hover) reveals a checkbox on hover, Gmail-list style.
 * Touch/coarse-pointer needs a long-press instead, which swaps the
 * thumbnail for a large checkbox — exactly like the mobile "select
 * multiple" gesture in Gmail/Photos/Files.
 */
export const SelectableList: Story = {
  render: () => ({
    template: `<ul-listing-selectable-demo />`,
  }),
};

export const Loading: Story = {
  args: {
    theme: 'ghost-white',
    disabled: false,
    loading: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 400px">
        <ul-list-item [theme]="theme" [disabled]="disabled" [loading]="loading">
          <ng-container ul-list-item-label>Loading list item</ng-container>
        </ul-list-item>
      </div>
    `,
  }),
};
