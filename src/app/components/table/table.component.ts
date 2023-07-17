import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from 'src/app/models/pagination.model';
import { TableAction } from 'src/app/models/table-action';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() isFilterTable: boolean = false;
  @Input() columns: string[] = [];
  @Input() data: CdkTableDataSourceInput<any> = [];
  @Input() isLoadingData: boolean = false;
  @Input() actions: TableAction[] = [];
  @Input() isPaginateTable: boolean = false;
  @Input() pagination: Pagination | null = new Pagination(0, 10, 0);
  @Output() executeAction: EventEmitter<{action:string, element: any}> = new EventEmitter<{action:string, element: any}>();

  filter: string = '';

  clearInput(): void {
    this.filter = '';
    this.filterTable();
  }

  emitAction(action: string, elementSelected: any): void{
    this.executeAction.emit({action, element: elementSelected});
  }

  filterTable(): void {
    this.executeAction.emit({action: 'filter',element: this.filter});
  }

  updatePagination(event: any): void {
    this.executeAction.emit({action: 'pagination', element: event});
  }

}


