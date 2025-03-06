import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'carsApp';
  constructor( private authService: AuthService){}

  ngOnInit(): void {
    this.authService.checkAuthenticacion()
      .subscribe( () => console.log('Finalizada la validación de autenticación')
       )
  }

}
