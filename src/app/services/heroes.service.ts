import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hero } from '../models/hero';
import { Observable, connect } from 'rxjs';
import { Pagination } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getHeroes(filter: string, pagination: Pagination): Observable<Hero[]> {
    let params: any = {};
    params.filter = filter;
    params.page = pagination.page;
    params.pageSize = pagination.pageSize;
    return this.http.get<Hero[]>(this.url, {params});
  }
  getHero(heroId: number): Observable<Hero> {
    return this.http.get<Hero>(this.url + '/' + heroId);
  }

  createHero(hero: Partial<Hero>): Observable<Hero> {
    console.log('create hero', this.url)
    console.log('create hero hero', hero)
    return this.http.post<Hero>(this.url, hero);
  }

  updateHero(newValue: Hero): Observable<Hero> {
    const heroId = newValue.id;
    const url = `${this.url}/${heroId}`
    console.log('url:', url)
    console.log('newValue:', newValue)
    return this.http.put<Hero>(url, newValue);
  }

  deleteHero(heroId: string): Observable<Hero[]> {
    return this.http.delete<Hero[]>(`${this.url}/${heroId}`);
  }
}
