import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { Car } from '../interfaces/car.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { response } from 'express';

@Injectable({ providedIn: 'root' })
export class carService {
  private baseURL: string = environments.baseURL;

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.httpClient
      .get<{ data: Car[] }>(`${this.baseURL}`)
      .pipe(map((response) => response.data));
  }
  getCarById(id: string): Observable<Car | undefined> {
    return this.httpClient.get<{ data: Car }>(`${this.baseURL}/${id}`).pipe(
      map((response) => response.data),
      catchError((error) => of(undefined))
    );
  }
  getSuggestions(query: string): Observable<Car[]> {
    return this.httpClient
      .get<{ data: Car[] }>(`${this.baseURL}${query}`)
      .pipe(map((response) => response.data));
  }
  addCar(car: Car): Observable<Car> {
    return this.httpClient.post<Car>(`${this.baseURL}`, car);
  }
  updateCar(car: Car): Observable<Car> {
    if (!car.id) throw Error('car id is required');
    return this.httpClient.patch<Car>(`${this.baseURL}${car.id}`, car);
  }
  deleteCarById(id: string): Observable<boolean> {
    return this.httpClient.delete(`${this.baseURL}${id}`).pipe(
      map((resp) => true),
      //catchError((err) => of(false))
    );
  }
}
