import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingServiceBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingServiceObservable: Observable<boolean> = this.loadingServiceBehaviorSubject.asObservable();

  constructor() { }

  setLoading(isLoading: boolean): void {
    this.loadingServiceBehaviorSubject.next(isLoading);
  }

}
