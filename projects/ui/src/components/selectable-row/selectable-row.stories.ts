import { Component, computed, signal } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';

import { Meta, StoryObj } from '../../../.storybook/types';
import { CheckboxComponent } from '../checkbox/checkbox';

import { SelectableRowComponent } from './selectable-row';

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

@Component({
  selector: 'ul-selectable-row-demo',
  imports: [SelectableRowComponent, CheckboxComponent],
  template: `
    <div
      style="min-height: 320px; padding: 1.5rem; background: var(--color-background-main, #0a0a0a);"
    >
      <div style="max-width: 420px; display: flex; flex-direction: column; gap: 12px;">
        <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 0;">
          Resize the viewport (or use Storybook's device toolbar) to see both modes. Fine-pointer /
          real-hover viewports: hover a row to reveal its checkbox, Gmail-style. Coarse-pointer /
          no-hover viewports: long-press (or mouse-click-and-hold ~500ms) a row — it swaps the
          thumbnail for a large checkbox instead.
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
            <ul-selectable-row
              [selected]="isSelected(listing.id)"
              [selectionActive]="hasSelection()"
              [ariaLabel]="'Select ' + listing.title"
              (selectedChange)="setSelected(listing.id, $event)"
              (longPress)="select(listing.id)"
            >
              <img
                ul-selectable-row-media
                [src]="listing.imageUrl"
                alt=""
                style="width: 48px; height: 48px; flex-shrink: 0; border-radius: 6px; object-fit: cover;"
              />
              <div ul-selectable-row-content style="min-width: 0; flex: 1;">
                <p
                  style="margin: 0; color: #ffffff; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                >
                  {{ listing.title }}
                </p>
                <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 13px;">
                  {{ listing.price }}
                </p>
              </div>
            </ul-selectable-row>
          }
        </div>
      </div>
    </div>
  `,
})
class SelectableRowDemoComponent {
  readonly listings = DEMO_LISTINGS;

  private readonly selectedIds = signal<ReadonlySet<number>>(new Set());
  readonly hasSelection = computed(() => this.selectedIds().size > 0);
  readonly allSelected = computed(() => this.listings.every((item) => this.isSelected(item.id)));
  readonly someSelected = computed(() => this.hasSelection() && !this.allSelected());

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

const meta: Meta<SelectableRowComponent> = {
  title: 'Components/Data Display/Selectable Row',
  component: SelectableRowComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Makes any projected row content selectable in a bulk-select list. Project a [ul-selectable-row-media] thumbnail and a [ul-selectable-row-content] label — anything else (a status pill, actions) can go in the default slot. Fine-pointer/real-hover devices get an always-present, hover-revealed checkbox (Gmail-list style); coarse-pointer/no-hover devices select via long-press instead, which swaps the media slot for a large checkbox on every row. Bind [selected]/[selectionActive] and listen for (selectedChange)/(longPress) — the consumer still owns the actual selection Set, this component only owns the gesture/layout orchestration. It does not know about routing, so a projected routerLink anchor still needs its own binding nulled out while selectionActive if tapping it should toggle instead of navigate.',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [SelectableRowDemoComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<SelectableRowComponent>;

export const Default: Story = {
  render: () => ({
    template: `<ul-selectable-row-demo />`,
  }),
};
