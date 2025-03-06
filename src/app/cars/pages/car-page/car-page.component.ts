import { Component } from '@angular/core';
import { Car } from '../../interfaces/car.interface';
import { carService } from '../../services/Car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-car-page',
  standalone: false,
  templateUrl: './car-page.component.html',
  styles: ``
})
export class CarPageComponent {

  public car?: Car;

  constructor (
    private carService: carService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
       
        switchMap(( { id } ) => this.carService.getCarById( id ))
      )
      .subscribe( car => {
        if (!car )return this.router.navigate([ '/cars/list' ]);
        this.car = car;
        console.log(car);
        return;
      })
  }
  goList():void{
    this.router.navigateByUrl('cars/list')
  }


}
