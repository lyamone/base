import { Component, input } from '@angular/core';
import { ButtonComponent } from '../button/button';
import { IconComponent, IconName } from '../icon/icon';
@Component({
  selector: 'ul-footer',
  templateUrl: 'footer.html',
  styleUrls: ['./footer.scss'],
  imports: [ButtonComponent, IconComponent],
  standalone: true,
})
export class FooterComponent {
  socialLinks = input<{ url: string; icon: IconName }[]>([]);
  links = input<{ url: string; text: string }[]>([]);

  navigate(url: string){
    window.location.href = url;
  }
}
