import { Restaurant } from 'src/models/Restaurant';
import { Component } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.css']
})
export class ListRestaurantsComponent {
  constructor(private restaurantService: RestaurantService, private router: Router) { }
  restaurants: any
  ngOnInit() {
    this.getAllRestaurants()
  }
  getAllRestaurants() {
    this.restaurantService.getRestaurants().subscribe({
      next: (res) => {
        this.restaurants = res
      }
    })
  }
  deleteNote(id: string, e: any) {
    e.stopPropagation()
    if (confirm('Are you sure to delete this record ?') == true) {
      this.restaurantService.deleteRestaurants(id).subscribe(() => {
        this.getAllRestaurants()
      });
    }
  }
  goToView(id: string): void {
    this.router.navigate(['view/', id])
  }
  goToCreate(): void {
    this.router.navigateByUrl('/create')
  }
  goToEdit(id: string): void {
    this.router.navigate(['edit/', id])
  }
}
