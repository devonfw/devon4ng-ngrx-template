import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MatPaginator,
  PageEvent,
  Sort,
} from '@angular/material';
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
import { SelectionModel } from '@angular/cdk/collections';
import { SampleDataAlertComponent } from '../sample-data-alert/sample-data-alert.component';

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
  @ViewChild('pagingBar') pagingBar: MatPaginator;

  data: any = [];
  /* @type {ITdDataTableColumn[]}
   * @memberof SampleDataGridComponent
   */
  columns: any[] = [
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
  displayedColumns: string[] = ['select', 'name', 'surname', 'age', 'mail'];
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
    searchTerms: { ...this.searchTerms },
    sort: this.pageable.sort = this.sorting,
  };
  selection: SelectionModel<any> = new SelectionModel<any>(false, []);
  sampledata$: Observable<SampledataModel[]>;
  /* Creates an instance of SampleDataGridComponent.
   * @param {Store<fromStore.AppState>} store
   * @param {TranslateService} translate
   * @param {MatDialog} dialog
   * @param {AuthService} authService
   * @param {Router} router
   * @param {SampleDataService} dataGridService
   * @memberof SampleDataGridComponent
   */
  constructor(
    private store: Store<fromStore.AppState>,
    private translate: TranslateService,
    public dialog: MatDialog,
    public authService: AuthService,
    public router: Router,
    public dataGridService: SampleDataService,
  ) {}
  ngOnInit(): void {
    this.sampledata$ = this.store.select<SampledataModel[]>(
      fromStore.getSampleDataDetails,
    );
    this.store.dispatch(new LoadData(this.loaddata));
    this.getSampleData();
  }
  getSampleData(): void {
    this.sampledata$.subscribe(
      (res: any) => {
        this.data = res.content;
        this.totalItems = res.totalElements;
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
    });
    return value;
  }
  /* @param {IPageChangeEvent} pagingEvent
   * @memberof SampleDataGridComponent
   */
  page(pagingEvent: PageEvent): void {
    this.pageable = {
      pageSize: pagingEvent.pageSize,
      pageNumber: pagingEvent.pageIndex,
      sort: this.pageable.sort,
    };
    const payload: any = {
      size: this.pageable.pageSize,
      page: this.pageable.pageNumber,
      searchTerms: { ...this.searchTerms },
      sort: this.pageable.sort = this.sorting,
    };
    this.store.dispatch(new LoadData(payload));
  }
  /* @param {ITdDataTableSortChangeEvent} sortEvent
   * @memberof SampleDataGridComponent
   */
  sort(sortEvent: Sort): void {
    this.sorting = [];
    if (sortEvent.direction) {
      this.sorting.push({
        property: sortEvent.active.split('.').pop(),
        direction: '' + sortEvent.direction,
      });
    }
    const payload: any = {
      size: this.pageable.pageSize,
      page: this.pageable.pageNumber,
      searchTerms: { ...this.searchTerms },
      sort: this.pageable.sort = this.sorting,
    };
    this.store.dispatch(new LoadData(payload));
  }
  checkboxLabel(row?: any): string {
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.position + 1}`;
  }
  openDialog(): void {
    this.dialogRef = this.dialog.open(SampleDataDialogComponent);
    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        result.size = this.pageable.pageSize;
        result.page = this.pageable.pageNumber;
        result.searchTerms = { ...this.searchTerms };
        result.sort = this.pageable.sort = this.sorting;
        this.store.dispatch(new AddData(result));
      }
    });
  }
  /* @param {*} e
   * @memberof SampleDataGridComponent
   */
  selectEvent(row: any): void {
    this.selection.toggle(row);
    this.selection.isSelected(row)
      ? (this.selectedRow = row)
      : (this.selectedRow = undefined);
  }
  openEditDialog(): void {
    this.dialogRef = this.dialog.open(SampleDataDialogComponent, {
      data: this.selectedRow,
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        result.size = this.pageable.pageSize;
        result.page = this.pageable.pageNumber;
        result.searchTerms = { ...this.searchTerms };
        result.sort = this.pageable.sort = this.sorting;
        this.store.dispatch(new EditData(result));
        this.selectedRow = undefined;
      }
    });
  }
  openConfirm(): void {
    const payload: any = {
      id: this.selectedRow.id,
      size: this.pageable.pageSize,
      page: this.pageable.pageNumber,
      searchTerms: { ...this.searchTerms },
      sort: this.pageable.sort = this.sorting,
    };
    this.dialog
      .open(SampleDataAlertComponent, {
        width: '400px',
        data: {
          message: this.getTranslation('sampledatamanagement.alert.message'),
          title: this.getTranslation('sampledatamanagement.alert.title'),
          cancelButton: this.getTranslation(
            'sampledatamanagement.alert.cancelBtn',
          ),
          acceptButton: this.getTranslation(
            'sampledatamanagement.alert.acceptBtn',
          ),
        },
      })
      .afterClosed()
      .subscribe((accept: boolean) => {
        if (accept) {
          this.store.dispatch(new DeleteData(payload));
          this.selectedRow = undefined;
        }
      });
  }
  filter(): void {
    const payload: any = {
      size: this.pageable.pageSize,
      page: this.pageable.pageNumber,
      searchTerms: { ...this.searchTerms },
      sort: this.pageable.sort = this.sorting,
    };
    this.store.dispatch(new LoadData(payload));
    this.pagingBar.firstPage();
  }

  /* @param {*} form
   * @memberof SampleDataGridComponent
   */
  searchReset(form: any): void {
    form.reset();
    this.store.dispatch(new LoadData(this.loaddata));
  }
}
