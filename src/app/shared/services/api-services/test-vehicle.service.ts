import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Vehicle {
  id: number;
  title: string;
  brand: string;
  model: string;
  price: number;
  year: number;
  image: string;
  special?: boolean;
  type: string;          // Car | Bike | Van | SUV
  location?: string;
}

export interface Page<T> {
  vehicles: T[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class TestVehicleService {

  private apiUrl = '/api/vehicles';

  constructor(private http: HttpClient) { }

  /** GET paginated list */
  getVehicles(opts: { page: number; limit: number }): Observable<Page<Vehicle>> {
    return of(this.mockVehicles(opts)).pipe(delay(300));
  }

  /** GET featured specials */
  getSpecials(): Observable<Vehicle[]> {
    return of(this.mockSpecials()).pipe(delay(200));
  }

  /** Autocomplete suggestions */
  searchSuggestions(query: string): Observable<any[]> {
    const all = this.mockAllVehicles();
    const filtered = all
      .filter(v => v.title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8);
    return of(filtered).pipe(delay(150));
  }

  /* ---------------------------------------------------- */
  /* ---- MOCK DATA (replace later with real API) ---- */
  private mockAllVehicles(): Vehicle[] {
    const imageMap: Record<string, string[]> = {
      Toyota: [
        "https://riyasewana.com/thumb/thumbtoyota-corolla-ce110-121237594171.jpg",
        "https://riyasewana.com/thumb/thumbtoyota-corolla-121-119423217721.jpg",
        "https://riyasewana.com/thumb/thumbtoyota-corolla-ce110-2155754801.jpg"
      ],
      Honda: [
        "https://riyasewana.com/thumb/thumbhonda-civic-2018-215444912931.jpg",
        "https://riyasewana.com/thumb/thumbhonda-civic-ek3-1997-214334912241.jpg",
        "https://riyasewana.com/thumb/thumbhonda-civic-ex-2018-212034812961.jpg"
      ],
      Suzuki: [
        "https://riyasewana.com/thumb/thumbsuzuki-alto-lxi-21829494491.jpg",
        "https://riyasewana.com/thumb/thumbsuzuki-alto-k10-21825464721.jpg",
        "https://riyasewana.com/thumb/thumbsuzuki-alto-21659404661.jpg"
      ],
      Nissan: [
        "https://riyasewana.com/thumb/thumbnissan-sunny-fb15-294059161.jpg",
        "https://riyasewana.com/thumb/thumbnissan-sunny-n16-285738831.jpg",
        "https://riyasewana.com/thumb/thumbnissan-sunny-2008-28154512821.jpg"
      ]
    };

    return Array.from({ length: 120 }, (_, i) => {
      const brand = ['Toyota', 'Honda', 'Suzuki', 'Nissan'][i % 4];
      const model = ['Corolla', 'Civic', 'Alto', 'Sunny'][i % 4];
      const type = ['car', 'bike', 'van', 'suv'][i % 4];
      const location = ['colombo', 'kandy', 'galle'][i % 3];
      const imageList = imageMap[brand];
      const image = imageList[i % imageList.length];

      return {
        id: i + 1,
        title: `${brand} ${model} ${2020 + (i % 5)}`,
        brand,
        model,
        price: Math.floor(Math.random() * 15_000_000) + 800_000,
        year: 2015 + (i % 10),
        image,
        type,
        location
      };
    });
  }

  private mockVehicles(opts: { page: number; limit: number }): Page<Vehicle> {
    const all = this.mockAllVehicles();
    const start = opts.page * opts.limit;
    return {
      vehicles: all.slice(start, start + opts.limit),
      total: all.length
    };
  }

  private mockSpecials(): Vehicle[] {
    return this.mockAllVehicles().slice(0, 6);
  }
}
