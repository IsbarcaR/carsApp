import { Component, Input } from '@angular/core';
import { Car } from '../../interfaces/car.interface';

@Component({
  selector: 'cars-car-card',
  standalone: false,
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent {
  @Input()
  public car!: Car;

  ngOnInit(): void {
    if ( !this.car ) throw Error ('Hero property is required');
  }
}


