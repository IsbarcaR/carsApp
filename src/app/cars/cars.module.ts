import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarPageComponent } from './pages/car-page/car-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    CarPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    CardComponent,
    ConfirmDialogComponent,
    
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    MaterialModule,
    MatChipsModule,
    ReactiveFormsModule
  ],
 
})
export class CarsModule { }
