import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Restaurant } from 'src/models/Restaurant';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent {
  id!: string;
  restaurant: Restaurant;

  constructor(private restaurantService: RestaurantService, private activatedRoute: ActivatedRoute,) { }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getResById()
  }
  getResById() {
    this.restaurantService.getRestaurantById(this.id).subscribe({
      next: (res) => {
        this.restaurant = res
      },
    });
  }
}
