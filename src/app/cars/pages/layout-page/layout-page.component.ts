import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  standalone: false,
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  constructor(private authService: AuthService,
    private router: Router
  ){}
  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list'},
    { label: 'Añadir', icon: 'add', url: './new-car'},
    { label: 'Buscar', icon: 'search', url: './search'},
  ]
  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }
  get user():User | undefined{
    return this.authService.currentUser;
  }
  


}
