import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from 'src/models/Restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  constructor(private http: HttpClient) { }

  readonly url = 'https://restaurantbackend-w4hh.onrender.com/api';

  getRestaurants() {
    return this.http.get<Restaurant>(`${this.url}/restaurants`)
  }
  getRestaurantById(id: string) {
    return this.http.get<Restaurant>(`${this.url}/restaurants/` + id)
  }
  postRestaurants(restaurant: Restaurant) {
    return this.http.post<Restaurant>(`${this.url}/restaurants/create`, restaurant)
  }
  updateRestaurants(id: string, restaurant: Restaurant) {
    return this.http.put<Restaurant>(`${this.url}/restaurants/` + id, restaurant)
  }
  deleteRestaurants(id: string) {
    return this.http.delete<Restaurant>(`${this.url}/restaurants/` + id)
  }
}
