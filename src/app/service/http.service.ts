import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { inject } from '@angular/core';
import { CategoryResponse } from '../models/carousel.models';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private http = inject(HttpClient);
  private apiUrl =
    'https://services.err.ee/api/v2/category/getByUrl?url=video&domain=jupiter.err.ee';
  private cache$: Observable<CategoryResponse> | null = null;

  getCategoryData(): Observable<CategoryResponse> {
    if (!this.cache$) {
      this.cache$ = this.http
        .get<CategoryResponse>(this.apiUrl)
        .pipe(tap(() => (this.cache$ = null)));
    }
    return this.cache$ || of({ data: { category: { frontPage: [] } } });
  }
}
