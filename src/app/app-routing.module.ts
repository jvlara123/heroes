import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesListComponent } from './views/heroes-list/heroes-list.component';
import { HeroDetailComponent } from './views/hero-detail/hero-detail.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HeroesListComponent},
  { path: 'heroes', component: HeroesListComponent},
  { path: 'hero/:id/edit', component: HeroDetailComponent},
  { path: 'hero/create', component: HeroDetailComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
