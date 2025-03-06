import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { carService } from '../../services/Car.service';
import { Car } from '../../interfaces/car.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  standalone: false,
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public cars: Car[]=[];
  public selectedCar?: Car;

  constructor(private carService: carService){}

  searchCar(){
    const value: string = this.searchInput.value || '';
    
    this.carService.getSuggestions(value)
    .subscribe( cars=> this.cars = cars)
  }
  onSelectedOption(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value){
      this.selectedCar = undefined;
      return;
    }
    const car: Car = event.option.value;
    this.searchInput.setValue( car.name );

    this.selectedCar = car;

    }
}
