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
  vhValue = 0;
  sizesAttr = '';
  nextOffsetVw = 0;

  ngOnInit(): void {
    this.updateTranslateX();
    this.sizesAttr = this.generateSizesAttr();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateTranslateX();
  }

  private generateSizesAttr(): string {
    const configs = [
      { min: 1920, max: null, count: 7 },
      { min: 1280, max: 1919.99, count: 6 },
      { min: 960, max: 1279.99, count: 4 },
      { min: 600, max: 959.99, count: 3 },
      { min: 0, max: 599.99, count: 2 },
    ];

    const gapVw = '0.3vw';

    return configs
      .map(({ min, max, count }) => {
        const media = max
          ? `(min-width: ${min}px) and (max-width: ${max}px)`
          : `(min-width: ${min}px)`;
        const gaps = `${count} * (${gapVw} ) + 4px`;
        const totalPadding = `8vw`;
        return `${media} calc((100vw - ${totalPadding} - (${gaps})) / ${count})`;
      })
      .join(',\n');
  }

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

  private getSlideWidthPx(count: number): number {
    const vw = window.innerWidth;
    const padding = (4 / 100) * vw;
    const gap = ((count * 0.3) / 100) * vw;
    const containerWidth = vw - padding - gap;
    return containerWidth / count;
  }

  updateTranslateX(): void {
    const vw = window.innerWidth;
    const count = this.visibleCount();
    const slideWidth = this.getSlideWidthPx(count);

    const baseTranslateXPx = -this.currentIndex * slideWidth;
    const totalGapBeforeCurrent = ((this.currentIndex * 0.39) / 100) * vw;
    this.translateX = baseTranslateXPx + totalGapBeforeCurrent;
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
}
