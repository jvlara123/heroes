import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';
import { ConfirmationPopupComponent } from 'src/app/components/confirmation-popup/confirmation-popup.component';
import { Hero } from 'src/app/models/hero';
import { HeroesService } from 'src/app/services/heroes.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Pagination } from 'src/app/models/pagination.model';
import { TableAction } from 'src/app/models/table-action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent {

  public heroesTable$: Observable<CdkTableDataSourceInput<Hero>> = new Observable<CdkTableDataSourceInput<Hero>>();
  public pagination$: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>(null as any);
  public isLoading$: Observable<boolean> = new Observable<boolean>();

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator :any = MatPaginator;
   
  displayedColumns: string[] = [ 'id', 'name', 'age', 'power'];
  public filter = '';
  public pagination: Pagination = new Pagination(0, 10, 0);
  public tableActions: TableAction[] = [
    {icon: 'edit', action: 'edit', color: 'primary'},
    {icon: 'delete', action: 'delete', color: 'warn'},
  ]

  constructor(public dialog: MatDialog, private heroesService: HeroesService, private loadingService: LoadingService, private router: Router) {
    this.getHeroes();
    this.isLoading$ = loadingService.loadingServiceObservable;
    this.pagination$.pipe(tap(pagination => {
      this.pagination = pagination;
    }));
   }

  deleteHero(hero: Hero): void {
    this.heroesService.deleteHero(hero.id).pipe(take(1)).subscribe(result => { 
      this.getHeroes();
    });
  }
 
  openConfirmation(hero: Hero): void {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      data: {title: `Are you sure you want to delete ${hero.name}?`},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteHero(hero);
    });
  }

  clearInput(): void {
    this.filter = '';
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesTable$ = this.heroesService.getHeroes(this.filter,this.pagination).pipe(map((result: any) => {
      const heroes: Hero[] = result.heroes;
      this.pagination$.next(result.pagination);
      const dataSource = new MatTableDataSource(heroes);
      dataSource.sort = this.sort;
      return dataSource;
    }));
  }

  updatePagination(event: any): void {
    this.pagination.numElements = event.length;
    this.pagination.page = event.pageIndex;
    this.pagination.pageSize = event.pageSize;
    this.getHeroes();
  }

  executeAction(action: any): void {
    if ( action.action === 'delete' ) {
      this.openConfirmation(action.element);
    } else if ( action.action === 'edit' ){
      this.router.navigate(['hero/' + action.element.id + '/edit']);
    } else if ( action.action === 'filter' ) {
      this.filter = action.element;
      this.getHeroes();
    } else if (action.action === 'pagination') {
      this.updatePagination(action.element);
    }
  }
}
