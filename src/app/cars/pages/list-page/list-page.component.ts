import { Component } from '@angular/core';
import { carService } from '../../services/Car.service';
import { Car } from '../../interfaces/car.interface';

@Component({
  selector: 'app-list-page',
  standalone: false,
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent {
  public cars: Car[] = [];

  constructor( private carsService: carService){}
 
  ngOnInit(): void {
    this.carsService.getCars(
     
    )
    .subscribe ( cars =>{
     /*  console.log("respuesta",cars); */
      this.cars=cars;
    });
  }

}
