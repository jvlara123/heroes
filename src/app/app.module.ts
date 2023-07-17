import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesListComponent } from './views/heroes-list/heroes-list.component';
import { HeroDetailComponent } from './views/hero-detail/hero-detail.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';
import { HeroesService } from './services/heroes.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UppercaseAllDirective } from './directives/uppercase-all.directive';
import { CommonModule } from '@angular/common';
import { LoadingHeroUpdateInterceptor } from './interceptors/loading-hero-update.interceptor';
import { LoadingComponent } from './components/loading/loading.component';
import { MaterialModule } from './material.module';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    HeroDetailComponent,
    NotFoundComponent,
    ConfirmationPopupComponent,
    UppercaseAllDirective,
    LoadingComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    MaterialModule 
  ],
  providers: [HeroesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingHeroUpdateInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
