import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ITdDataTableColumn,
  TdDataTableComponent,
  TdDialogService,
  IPageChangeEvent,
  ITdDataTableSortChangeEvent,
  TdPagingBarComponent,
} from '@covalent/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SampleDataService } from '../../services/sampledata.service';
import { AuthService } from '../../../core/security/auth.service';
import { SampleDataDialogComponent } from '../../components/sampledata-dialog/sampledata-dialog.component';
import { Pageable } from '../../../core/interfaces/pageable';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import {
  AddData,
  EditData,
  DeleteData,
  LoadData,
} from '../../store/actions/sampledata.actions';
import { SampledataModel } from '../../models/sampledata.model';

/* @export
 * @class SampleDataGridComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'public-app-sampledata-grid-display',
  templateUrl: './sampledata-grid.component.html',
  styleUrls: ['./sampledata-grid.component.scss'],
})
export class SampleDataGridComponent implements OnInit {
  private pageable: Pageable = {
    pageSize: 8,
    pageNumber: 0,
    sort: [
      {
        property: 'name',
        direction: 'ASC',
      },
    ],
  };

  private sorting: any[] = [];
  @ViewChild('pagingBar') pagingBar: TdPagingBarComponent;
  @ViewChild('dataTable') dataTable: TdDataTableComponent;
  data: any = [];
  /* @type {ITdDataTableColumn[]}
   * @memberof SampleDataGridComponent
   */
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
      name: 'mail',
      label: this.getTranslation(
        'sampledatamanagement.SampleData.columns.mail',
      ),
    },
  ];
  pageSize: number = 8;
  pageSizes: number[] = [8, 16, 24];
  selectedRow: any;
  dialogRef: MatDialogRef<SampleDataDialogComponent>;
  totalItems: number;
  /* @type {*}
   * @memberof SampleDataGridComponent
   */
  searchTerms: any = {
    id: undefined,
    name: undefined,
    surname: undefined,
    age: undefined,
    mail: undefined,
    modificationCounter: undefined,
    pageSize: undefined,
    pagination: undefined,
    searchTerms: undefined,
  };
  loaddata: any = {
    size: this.pageable.pageSize,
    page: this.pageable.pageNumber,
    searchTerms: this.searchTerms,
    sort: this.pageable.sort = this.sorting,
  };
  sampledata$: Observable<SampledataModel[]>;
  /* Creates an instance of SampleDataGridComponent.
   * @param {Store<fromStore.AppState>} store
   * @param {TranslateService} translate
   * @param {MatDialog} dialog
   * @param {AuthService} authService
   * @param {Router} router
   * @param {SampleDataService} dataGridService
   * @param {TdDialogService} _dialogService
   * @memberof SampleDataGridComponent
   */
  constructor(
    private store: Store<fromStore.AppState>,
    private translate: TranslateService,
    public dialog: MatDialog,
    public authService: AuthService,
    public router: Router,
    public dataGridService: SampleDataService,
    private _dialogService: TdDialogService,
  ) {}
  ngOnInit(): void {
    this.sampledata$ = this.store.select<SampledataModel[]>(
      fromStore.getSampleDataArray,
    );
    this.store.dispatch(new LoadData(this.loaddata));
    this.getSampleData();
  }
  getSampleData(): void {
    this.sampledata$.subscribe(
      (res: SampledataModel[]) => {
        this.data = res;
        this.totalItems = res.length;
        this.dataTable.refresh();
      },
      (error: any) => {
        //
      },
    );
  }

  /* @param {string} text
   * @returns {string}
   * @memberof SampleDataGridComponent
   */
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
  /* @param {IPageChangeEvent} pagingEvent
   * @memberof SampleDataGridComponent
   */
  page(pagingEvent: IPageChangeEvent): void {
    this.pageable = {
      pageSize: pagingEvent.pageSize,
      pageNumber: pagingEvent.page - 1,
      sort: this.pageable.sort,
    };
    const payload: any = {
      size: this.pageable.pageSize,
      page: this.pageable.pageNumber,
      searchTerms: this.searchTerms,
      sort: this.pageable.sort = this.sorting,
    };
    this.store.dispatch(new LoadData(payload));
  }
  /* @param {ITdDataTableSortChangeEvent} sortEvent
   * @memberof SampleDataGridComponent
   */
  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sorting = [];
    this.sorting.push({
      property: sortEvent.name.split('.').pop(),
      direction: '' + sortEvent.order,
    });
    const payload: any = {
      size: this.pageable.pageSize,
      page: this.pageable.pageNumber,
      searchTerms: this.searchTerms,
      sort: this.pageable.sort = this.sorting,
    };
    this.store.dispatch(new LoadData(payload));
  }
  openDialog(): void {
    this.dialogRef = this.dialog.open(SampleDataDialogComponent);
    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.store.dispatch(new AddData(result));
      }
    });
  }
  /* @param {*} e
   * @memberof SampleDataGridComponent
   */
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
          this.store.dispatch(new EditData(result));
        }
      }
      const payload: any = {
        size: this.pageable.pageSize,
        page: this.pageable.pageNumber,
        searchTerms: this.searchTerms,
        sort: this.pageable.sort = this.sorting,
      };
      this.store.dispatch(new LoadData(payload));
    });
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
      })
      .afterClosed()
      .subscribe((accept: boolean) => {
        if (accept) {
          this.store.dispatch(new DeleteData(payload));
          this.selectedRow = undefined;
          // this.getSampleData();
        }
      });
  }
  filter(): void {
    this.pagingBar.firstPage();
  }

  /* @param {*} form
   * @memberof SampleDataGridComponent
   */
  searchReset(form: any): void {
    form.reset();
  }
}
