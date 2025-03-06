import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate{
   constructor(
        private authService: AuthService,
        private router: Router
    ) { }
    private checkAuthStatus(): boolean | Observable<boolean>{
      return this.authService.checkAuthenticacion()
        .pipe(
       //   tap( isAuthenticated => console.log('Autenticado: ', isAuthenticated)),
          tap( isAuthenticated => {
            if ( isAuthenticated ){
              this.router.navigate(['./'])
            }
          
          }),
          map ( isAuthenticated => !isAuthenticated)
        )
    }
  

    canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    /*   console.log('Can Match');
      console.log({ route, segments}); */
  
      return this.checkAuthStatus();    
    }
   
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      /* console.log('Can Activate');
      console.log({ route, state}); */
  
      return this.checkAuthStatus();
    }
  
  

    
    
}