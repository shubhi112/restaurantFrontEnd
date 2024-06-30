import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Restaurant } from 'src/models/Restaurant';

@Component({
  selector: 'app-create-restaurants',
  templateUrl: './create-restaurants.component.html',
  styleUrls: ['./create-restaurants.component.css']
})
export class CreateRestaurantsComponent implements OnInit {
  restaurantForm: FormGroup;
  restaurantId: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private messageService: MessageService
  ) {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      location: ['', Validators.required],
      ratings: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
      timeToDeliver: ['', Validators.required],
      deliveryFee: [null, Validators.required],
      cuisine: this.fb.array([], Validators.required),
      menu: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
    if (this.restaurantId) {
      this.isEditMode = true;
      this.restaurantService.getRestaurantById(this.restaurantId).subscribe((restaurant: Restaurant) => {
        this.restaurantForm.patchValue(restaurant);
        this.setCuisine(restaurant.cuisine);
        this.setMenu(restaurant.menu);
      });
    } else {
      this.addMenuItem();  // Ensure at least one menu item is present
    }
  }

  createMenuItem(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      price: [null, Validators.required]
    });
  }

  get cuisine() {
    return this.restaurantForm.get('cuisine') as FormArray;
  }

  get menu() {
    return this.restaurantForm.get('menu') as FormArray;
  }

  setCuisine(cuisines: string[]): void {
    this.cuisine.clear();
    cuisines.forEach(cuisine => this.cuisine.push(this.fb.control(cuisine, Validators.required)));
  }

  setMenu(menuItems: MenuItem[]): void {
    this.menu.clear();
    menuItems.forEach(item => this.menu.push(this.fb.group(item)));
  }

  addCuisine(cuisine: string) {
    this.cuisine.push(this.fb.control(cuisine, Validators.required));
  }

  addMenuItem() {
    this.menu.push(this.createMenuItem());
  }

  removeCuisine(index: number) {
    this.cuisine.removeAt(index);
  }

  removeMenuItem(index: number) {
    this.menu.removeAt(index);
  }

  onSave() {
    if (this.restaurantForm.invalid) {
      return;
    }
    if (this.isEditMode) {
      this.editRestaurant();
    } else {
      this.createRestaurant();
    }
  }

  editRestaurant() {
    const restaurantData: Restaurant = this.restaurantForm.value;
    this.restaurantService.updateRestaurants(this.restaurantId!, restaurantData).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Restaurant updated successfully' });

        setTimeout(() => {
          this.restaurantForm.reset();
          this.router.navigate(['/']);
        }, 1000);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update restaurant' });
      }
    });
  }

  createRestaurant() {
    const restaurantData: Restaurant = this.restaurantForm.value;
    this.restaurantService.postRestaurants(restaurantData).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Restaurant created successfully' });
        setTimeout(() => {
          this.restaurantForm.reset();
          this.router.navigate(['/']);
        }, 1000);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create restaurant' });
      }
    });
  }
}
