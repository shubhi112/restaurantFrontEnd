import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateRestaurantsComponent } from './components/create-restaurants/create-restaurants.component';
import { ListRestaurantsComponent } from './components/list-restaurants/list-restaurants.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BadgeModule } from 'primeng/badge';
import { ViewDetailsComponent } from './components/view-details/view-details.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateRestaurantsComponent,
    ListRestaurantsComponent,
    NavbarComponent,
    ViewDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CardModule,
    ChipModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule,
    BadgeModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
