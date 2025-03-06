import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../../cars/interfaces/user.interface';

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
  public loginForm= new FormGroup({
    
    email: new FormControl('',{nonNullable:true}),
    pass: new FormControl('',{nonNullable:true})

  })
  
  get user():User{
    const user= this.loginForm.value as User
    return user;
  }

  onLogin():void{
    console.log(this.user.email);
    this.authService.login(this.user.email,this.user.pass)
    .subscribe( user => {
      this.router.navigateByUrl('');
    }
    )
  }

}
