import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRestaurantsComponent } from './components/create-restaurants/create-restaurants.component';
import { ListRestaurantsComponent } from './components/list-restaurants/list-restaurants.component';
import { ViewDetailsComponent } from './components/view-details/view-details.component';

const routes: Routes = [
  {
    path: '', component: ListRestaurantsComponent
  },
  { path: 'create', component: CreateRestaurantsComponent },
  { path: 'edit/:id', component: CreateRestaurantsComponent },
  { path: 'view/:id', component: ViewDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
