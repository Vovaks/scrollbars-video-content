import {
  Component,
  OnInit,
  TrackByFunction,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HttpService } from './service/http.service';
import { inject } from '@angular/core';
import { CarouselSection, CategoryResponse } from './models/carousel.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  providers: [HttpService],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements OnInit {
  carousels: CarouselSection[] = [];

  private httpService = inject(HttpService);

  trackByCarousel: TrackByFunction<CarouselSection> = (_, item) => item.header;

  ngOnInit(): void {
    this.httpService.getCategoryData().subscribe({
      next: (response: CategoryResponse) => {
        console.log('Category data fetched successfully:', response);
        this.carousels = response.data.category.frontPage.filter(
          (section: CarouselSection) =>
            section.data &&
            section.data.length > 0 &&
            section.highTimeline === true,
        );
      },
      error: (error: Error) => {
        console.error('Error fetching category data:', error);
        this.carousels = []; // Fallback to empty array on error
      },
    });
  }
}
