import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselItem } from '../../../models/carousel.models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-carousel-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
})
export class CarouselItemComponent {
  readonly item = input.required<CarouselItem>();
  readonly sizes = input<string>('');
}
