import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../environments/environments';
import { User } from '../../cars/interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environments.baseURL;
  private user?: User;

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }
  login(email: string, password: string): Observable<User | null> {
    return this.httpClient.get<{data:User[]}>(`${ this.baseUrl }user`)
    .pipe(
      map(response => response.data[0]),//pongo el 0 para obtener el primer usuario (solo hay uno)
      tap(user => {
        
          this.user = user;
          localStorage.setItem('token', "pepino");
        
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return of(null); 
      })
    );
  }
  logout () {
    this.user = undefined;
    localStorage.clear();
  }
 /*   checkAuthenticacion(): Observable<boolean>{
   
    if (!localStorage.getItem('token')) return of(false);
   
    const token = localStorage.getItem('token');

    return this.httpClient.get<{data:User[]}>(`${ this.baseUrl }user`)
    .pipe(
      map(response => response.data[0]),
              tap ( user => this.user=user),
              map ( user => !!user),
              catchError ( err => of(false))
            )
  } */

 checkAuthenticacion(): Observable<boolean> {
   
    if (typeof window === 'undefined' || !localStorage.getItem('token')) {
        return of(false);
    }
   
    const token = localStorage.getItem('token');

    return this.httpClient.get<{ data: User[] }>(`${this.baseUrl}user`)
        .pipe(
            map(response => response.data[0]),
            tap(user => this.user = user),
            map(user => !!user),
            catchError(err => of(false))
        );
}  


  

}
