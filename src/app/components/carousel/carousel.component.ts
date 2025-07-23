import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { CarouselItem } from '../../models/carousel.models';

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

  itemsPerView = 4;
  translateX = 0;

  ngOnInit(): void {
    this.updateItemsPerView();
    window.addEventListener('resize', () => this.updateItemsPerView());
  }

  updateItemsPerView(): void {
    if (window.innerWidth < 640) {
      this.itemsPerView = 1;
    } else if (window.innerWidth < 1024) {
      this.itemsPerView = 2;
    } else if (window.innerWidth < 1280) {
      this.itemsPerView = 3;
    } else {
      this.itemsPerView = 4;
    }
    this.updateTranslateX();
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateTranslateX();
    }
  }

  nextSlide(): void {
    //TODO: add return if we have last slide
    if (this.currentIndex < this.items.length - this.itemsPerView) {
      this.currentIndex++;
      this.updateTranslateX();
    }
  }

  updateTranslateX(): void {
    this.translateX = -this.currentIndex * (100 / this.itemsPerView);
  }

  canGoPrev(): boolean {
    return this.currentIndex > 0;
  }

  canGoNext(): boolean {
    return this.currentIndex < this.items.length - this.itemsPerView;
  }
}
