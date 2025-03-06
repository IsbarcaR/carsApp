import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { carService } from '../../services/Car.service';
import { Car } from '../../interfaces/car.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  standalone: false,
  templateUrl: './new-page.component.html',
  styles: ``,
})
export class NewPageComponent {
  constructor(
    private carService: carService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    //Si la URL no contiene edit salgo
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.carService.getCarById(id))
        //Desectruturamos "params", solo necesitamos el "id"
      )
      .subscribe((car) => {
        if (!car) return this.router.navigateByUrl('');
        //Si no viene "car" retornamos a /
        this.carForm.reset(car);
        //Si devuelve "car" completo el formulario con los datos
        return;
      });
  }

  public carForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    id: new FormControl(''),
    year: new FormControl(0, { nonNullable: true }),
    type: new FormControl('', { nonNullable: true }),
    brand: new FormControl('', { nonNullable: true }),
    specifications: new FormControl('', { nonNullable: true }),
    image: new FormControl('', { nonNullable: true }),
  });
  get currentCar(): Car {
    const car = this.carForm.value as Car;
    return car;
  }
  showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }

  onSubmit(): void {
    if (this.carForm.invalid) return;

    if (this.currentCar.id) {
      this.carService.updateCar(this.currentCar).subscribe((car) => {
        this.router.navigateByUrl('');
        this.showSnackbar(`${this.currentCar.name} updated`);
      });
      return;
    }
    this.carService.addCar(this.currentCar).subscribe((car) => {
      this.showSnackbar(`${this.currentCar.name} created`);
    });
  }
  onDeleteHero() {
    if (!this.currentCar.id) throw Error('Car id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:  this.carForm.value ,
    });

   
    dialogRef.afterClosed()
    .pipe(
      //filter( result => result === true),filtramos, si es “true” pasa
      filter ((result:boolean) => result),
      switchMap( ()=> this.carService.deleteCarById( this.currentCar.id) ),
      filter ( (wasDeleted:boolean)=>wasDeleted),
      tap ( wasDeleted => console.log({wasDeleted})
      )
    )
    .subscribe(result => {
      this.router.navigateByUrl('');
    });
   


  }
}
