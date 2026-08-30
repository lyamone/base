import { Component, computed, input, ViewEncapsulation } from '@angular/core';

/** Icon size keys from design tokens (iconography.font.size). */
export type IconSize = '4' | '5' | '6' | '7' | '8' | '10' | '12' | '16' | '24' | '32';

/** Icon weight keys from design tokens (iconography.font.weight). */
export type IconWeight = 'medium' | 'bold';

/** Icon name / glyph key from design tokens (content['icon-glyph']). Valid values match token keys. */
export type IconName = string;

// <ul-icon class="ul-icon ul-icon-size-${size} ul-icon-weight-${weight} ul-icon-${icon}" />
@Component({
  selector: 'ul-icon',
  template: ``,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class IconComponent {
  size = input<IconSize>('8');
  weight = input<IconWeight>('medium');
  icon = input.required<IconName>();

  readonly hostClasses = computed(() => {
    return `ul-icon ul-icon-size-${this.size()} ul-icon-weight-${this.weight()} ul-icon-${this.icon()}`;
  });
}
