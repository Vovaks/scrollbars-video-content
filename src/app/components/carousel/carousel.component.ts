import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselItem } from '../../models/carousel.models';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, CarouselItemComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() items: CarouselItem[] = [];
  @Input() header = '';

  currentIndex = 0;
  translateX = 0;

  slideWidthPercent = 100 / this.visibleCount();

  sizesAttr = `
  (min-width: 1920px) calc((100vw - 60px - 24px - (7 * (0.3vw + 4px))) / 7),
  (min-width: 1280px) and (max-width: 1919.99px) calc((100vw - 60px - 24px - (6 * (0.3vw + 4px))) / 6),
  (min-width: 960px) and (max-width: 1279.99px) calc((100vw - 60px - 24px - (4 * (0.3vw + 4px))) / 4),
  (min-width: 600px) and (max-width: 959.99px) calc((100vw - 60px - 24px - (3 * (0.3vw + 4px))) / 3),
  (max-width: 599.99px) calc((100vw - 60px - 12px - (2 * (0.3vw + 4px))) / 2)
`;

  visibleCount(): number {
    const w = window.innerWidth;
    if (w >= 1920) {
      return 7;
    }
    if (w >= 1280) {
      return 6;
    }
    if (w >= 960) {
      return 4;
    }
    if (w >= 600) {
      return 3;
    }
    return 2;
  }

  updateTranslateX(): void {
    const count = this.visibleCount();
    this.translateX = -this.currentIndex * (94 / count);
  }

  canGoPrev(): boolean {
    return this.currentIndex > 0;
  }

  canGoNext(): boolean {
    const count = this.visibleCount();
    return this.currentIndex < this.items.length - count;
  }

  prevSlide(): void {
    const count = this.visibleCount();
    this.currentIndex -= count;
    if (this.currentIndex < 0) {
      this.currentIndex = 0;
    }
    this.updateTranslateX();
  }

  nextSlide(): void {
    const count = this.visibleCount();
    this.currentIndex += count;
    if (this.currentIndex > this.items.length - count) {
      this.currentIndex = this.items.length - count;
    }
    this.updateTranslateX();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateTranslateX();
  }

  ngOnInit(): void {
    this.updateTranslateX();
  }
}
