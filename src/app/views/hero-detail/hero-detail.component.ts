import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HeroesService } from 'src/app/services/heroes.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {

  isEdition: boolean = false;
  id: number = -1;
  private subscriptions = new Subscription();
  isLoading$: Observable<boolean> = new Observable<boolean>();

  heroForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',Validators.required),
    age: new FormControl(''),
    power: new FormControl('', Validators.required),
  });

  constructor(private heroesService: HeroesService, private activatedRoute: ActivatedRoute, private router: Router, private loadingService: LoadingService) {}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.loadingServiceObservable;
    this.subscriptions.add(
      this.activatedRoute.params.subscribe(params => {
        this.id = params['id']; 
        this.isEdition = this.id !== undefined;
        if (this.isEdition) {
          this.subscriptions.add(
            this.heroesService.getHero(this.id).subscribe(hero => {
              this.heroForm.setValue(hero);
            })
          );
        }
      })
    );
  }

  submitForm(): void {
    if (this.isEdition) {
      this.heroesService.updateHero(this.heroForm.value).subscribe(result => {
        this.router.navigate(['']);
      });
    } else {
      this.heroesService.createHero(this.heroForm.value).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
        this.router.navigate(['']);
      }
    });
    }
  }
}
