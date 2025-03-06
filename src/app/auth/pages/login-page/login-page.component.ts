import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {
  constructor(private authService: AuthService,
    private router: Router
  ){}
  
  onLogin():void{
    this.authService.login('ismael@gmail.com','1234')
    .subscribe( user => {
      this.router.navigateByUrl('');
    }
    )
  }

}
