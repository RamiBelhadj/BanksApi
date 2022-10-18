import {  Component, Directive, EventEmitter, Input, OnInit, Output, QueryList,  ViewChildren } from '@angular/core';
import { select , Store } from '@ngrx/store'
import { invokeDeleteTransferAPI, invokeTransferAPI } from '../store/transfers.action';
import { registerLocaleData } from '@angular/common';
import localeDE  from '@angular/common/locales/de';
import { selectTransfers } from '../store/transfers.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import {  Observable  } from 'rxjs';
import { Transfers } from '../store/transfers';

registerLocaleData(localeDE, 'de');

export type SortColumn = keyof Transfers | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}


declare var window : any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  constructor(private store: Store, private appStore: Store<Appstate>) {
    
    
  }
  displayedColumns: string[] = ['accountHolder', 'iban', 'date', 'amount', 'note'];
  //  dataSource: MatTableDataSource<Transfers>;
  deleteModal : any ;
  id: string = '' ;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  
  
 
  transfers$ : Observable<Transfers[]>= this.store.pipe(select(selectTransfers))
  transfers : Transfers[] = []
  initialTransfers : Transfers[] = []
  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
     this.transfers$.subscribe(
      (data) =>{
        this.initialTransfers = data
        this.transfers =data
      }
    )
    this.store.dispatch(invokeTransferAPI())
  }
  
  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      
          
          this.transfers =this.initialTransfers
        
      
    } else {
      this.transfers = [...this.transfers].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    
    this.transfers = [...this.initialTransfers].filter((transfer) =>
      transfer.accountHolder.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()) ||
      transfer.note.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()) 

    )
  }

  onDeleteModal(id: string | undefined) {
    if (id !== undefined) 
      this.id = id
    this.deleteModal.show()
  }

  delete(){
    
    this.store.dispatch(
      invokeDeleteTransferAPI({
        id : this.id
      })
    )
    
    let apiStatus$ = this. appStore.pipe(select(selectAppState))
    apiStatus$.subscribe((appState)=> {

      if (appState.apiStatus == 'success'){
        this.deleteModal.hide()
        this.appStore.dispatch(
          setAPIStatus({
            apiStatus:{apiResponseMessage:'',apiStatus:''}
          })
        )
      }
    })
  }
}
