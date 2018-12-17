import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ITdDataTableColumn,
  TdDataTableComponent,
  TdDialogService,
  IPageChangeEvent,
  ITdDataTableSortChangeEvent,
} from '@covalent/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SampleDataService } from '../services/sampledata.service';
import { AuthService } from '../../core/security/auth.service';
import { SampleDataDialogComponent } from '../../sampledata/sampledata-dialog/sampledata-dialog.component';
import { Pagination } from '../../core/interfaces/pagination';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.states';
import { AddData, EditData, DeleteData, SearchData, LoadDataSuccess } from '../store/actions/sampledata-templetes.actions';
import { Login } from '../models/login.model';

@Component({

  selector: 'public-app-sampledata-grid-display',
  templateUrl: './sampledata-grid-display.component.html',
  styleUrls: ['./sampledata-grid-display.component.scss'],
})
export class SampledataGridDisplayComponent implements OnInit {
   private pagination: Pagination = {
    size: 8,
    page: 1,
    total: 1,
  };
  private sorting: any[] = [];
  user: Login = new Login();
  @ViewChild('dataTable') dataTable: TdDataTableComponent;

  data: any = [];
  columns: ITdDataTableColumn[] = [
    {
      name: 'name',
      label: this.getTranslation(
        'sampledatamanagement.SampleData.columns.name',
      ),
    },
    {
      name: 'surname',
      label: this.getTranslation(
        'sampledatamanagement.SampleData.columns.surname',
      ),
    },
    {
      name: 'age',
      label: this.getTranslation('sampledatamanagement.SampleData.columns.age'),
    },
    {
      name: 'email',
      label: this.getTranslation(
        'sampledatamanagement.SampleData.columns.email',
      ),
    },
  ];
  pageSize: number = 8;
  pageSizes: number[] = [8, 16, 24];
  selectedRow: any;
  dialogRef: MatDialogRef<SampleDataDialogComponent>;
  totalItems: number;
  searchTerms: any = {
    id : undefined,
    name: undefined,
    surname: undefined,
    age: undefined,
    email: undefined,
    modificationCounter: undefined,
    pageSize: undefined,
    pagination: undefined,
    searchTerms: undefined,
  };
  contacts$: Observable<Login[]>;
  constructor(
    private store: Store<AppState>,
    private translate: TranslateService,
    public dialog: MatDialog,
    public authService: AuthService,
    public router: Router,
    public dataGridService: SampleDataService,
    private _dialogService: TdDialogService,
    ) {

    this.dataGridService.componentMethodCalled$.subscribe(
      () => {
        this.getSampleData();
      },
    );
  }
  ngOnInit(): void {
    this.store.dispatch(new LoadDataSuccess());
  }
 getSampleData(): void {
    this.dataGridService.getSampleData(this.pageSize, this.pagination.page,
      this.searchTerms, this.sorting)
      .subscribe(
        (res: any) => {
         this.data = res.result;
         this.totalItems = res.pagination.total;
         this.dataTable.refresh();
        },
        (error: any) => {
          setTimeout(() => {
            this._dialogService.openAlert({
              message: error.message,
              title: this.getTranslation('ERROR'),
              closeButton: 'CLOSE',
            });
          });
        },
      );
    }
  getTranslation(text: string): string {
    let value: string;
    this.translate.get(text).subscribe((res: string) => {
      value = res;
    });
    this.translate.onLangChange.subscribe(() => {
      this.columns.forEach((column: any) => {
        if (text.endsWith(column.name)) {
          this.translate
            .get('sampledatamanagement.SampleData.columns.' + column.name)
            .subscribe((res: string) => {
              column.label = res;
            });
        }
      });
      this.dataTable.refresh();
    });
    return value;
  }
  page(pagingEvent: IPageChangeEvent): void {
    this.pagination = {
      size: pagingEvent.pageSize,
      page: pagingEvent.page,
      total: 1,
    };
    this.getSampleData();
  }
  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sorting = [];
    this.sorting.push({
      name: sortEvent.name.split('.').pop(),
      direction: '' + sortEvent.order,
    });
    this.getSampleData();
  }
   openDialog(): void {
    this.dialogRef = this.dialog.open(SampleDataDialogComponent);
    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      const payload: any = {
         name : result.name,
          surname : result.surname,
          age : result.age,
          email : result.email,
        };
      this.store.dispatch(new AddData(payload));
      this.getSampleData();
       }
    });
  }
  selectEvent(e: any): void {
    e.selected ? (this.selectedRow = e.row) : (this.selectedRow = undefined);
  }
  openEditDialog(): void {
    this.dialogRef = this.dialog.open(SampleDataDialogComponent, {
      data: this.selectedRow,
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        {
          const payload: any = {
          id : result.id,
          name : result.name,
          surname : result.surname,
          age : result.age,
          email : result.email,
          modificationCounter: result.modificationCounter,
      };
          this.store.dispatch(new EditData(payload));
      }
    }
  },
    );
  }
  openConfirm(): void {

    const payload: any = {
     id: this.selectedRow.id,
    };
    this._dialogService
       .openConfirm({
         message: this.getTranslation('sampledatamanagement.alert.message'),
         title: this.getTranslation('sampledatamanagement.alert.title'),
         cancelButton: this.getTranslation(
           'sampledatamanagement.alert.cancelBtn',
         ),
         acceptButton: this.getTranslation(
           'sampledatamanagement.alert.acceptBtn',
         ),
       }) .afterClosed().subscribe((accept: boolean) => {
            if (accept) {
       this.store.dispatch(new DeleteData(payload));
       // this.getSampleData();
       this.selectedRow = undefined;
         }
          });
  }
  searchReset(form: any): void {
    form.reset();
    this.getSampleData();
  }
  getSampleData_1(): void {
    const payload: any = {
      pageSize: this.pageSize,
      pagination : this.pagination.page,
      searchTerms: this.searchTerms,
      'test': this.sorting,
      data: this.data,
      totalItems: this.totalItems,
      'total' : this.pagination.total,
      dataTable: this.dataTable,
      'amit': 'amt',
   };
    this.store.dispatch(new SearchData(payload));

  }
}
