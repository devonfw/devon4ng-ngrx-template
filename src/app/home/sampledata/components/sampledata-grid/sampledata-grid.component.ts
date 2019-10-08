import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SampleDataService } from '../../services/sampledata.service';
import { AuthService } from '../../../../core/security/auth.service';
import { SampleDataDialogComponent } from '../../components/sampledata-dialog/sampledata-dialog.component';
import { Pageable } from '../../../../shared/models/pageable';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as sampleDataActions from '../../store/actions/sampledata.actions';
import { SampleDataModel } from '../../models/sampledata.model';
import { SelectionModel } from '@angular/cdk/collections';
import { SampleDataAlertComponent } from '../sampledata-alert/sampledata-alert.component';
import { untilDestroyed } from 'ngx-take-until-destroy';

/* @export
 * @class SampleDataGridComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'public-app-sampledata-grid-display',
  templateUrl: './sampledata-grid.component.html',
  styleUrls: ['./sampledata-grid.component.scss'],
})
export class SampleDataGridComponent implements OnInit, OnDestroy {
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

  private sampledata$: Observable<SampleDataModel[]>;
  private sampledataTotal$: Observable<number>;
  private sorting: any[] = [];
  @ViewChild('pagingBar', { static: true }) pagingBar: MatPaginator;

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

  totalItems: number;
  pageSize: number = 8;
  pageSizes: number[] = [8, 16, 24];
  selectedRow: any;
  dialogRef: MatDialogRef<SampleDataDialogComponent>;
  selection: SelectionModel<any> = new SelectionModel<any>(false, []);

  /* @type {*}
   * @memberof SampleDataGridComponent
   */
  searchTerms: Object = {
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
    this.sampledata$ = this.store.select<SampleDataModel[]>(
      fromStore.getSampleDataArray,
    );

    this.sampledataTotal$ = this.store.select<number>(
      fromStore.getSampleDataTotal,
    );

    this.store.dispatch(sampleDataActions.loadData(this.getSearchCriteria()));
    this.getSampleData();
  }

  ngOnDestroy(): void {
  /* Method necessary to manage unsubcriptions,  it must not be deleted*/
  }

  getSampleData(): void {
    this.sampledataTotal$.pipe(untilDestroyed(this)).subscribe(
      (res: number) => {
        this.totalItems = res;
      },
      (error: any) => {
        //
      },
    );

    this.sampledata$.pipe(untilDestroyed(this)).subscribe(
      (res: SampleDataModel[]) => {
        this.data = res;
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

    this.translate
      .get(text)
      .pipe(untilDestroyed(this))
      .subscribe((res: string) => {
        value = res;
      });

    this.translate.onLangChange.pipe(untilDestroyed(this)).subscribe(() => {
      this.columns.forEach((column: any) => {
        if (text.endsWith(column.name)) {
          this.translate
            .get('sampledatamanagement.SampleData.columns.' + column.name)
            .pipe(untilDestroyed(this))
            .subscribe((res: string) => {
              column.label = res;
            });
        }
      });
    });
    return value;
  }

  getSearchCriteria(): {} {
    return {
      size: this.pageable.pageSize,
      page: this.pageable.pageNumber,
      searchTerms: { ...this.searchTerms },
      sort: this.pageable.sort = this.sorting,
    };
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

    this.store.dispatch(sampleDataActions.loadData(this.getSearchCriteria()));
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
    this.store.dispatch(sampleDataActions.loadData(this.getSearchCriteria()));
  }
  checkboxLabel(row?: any): string {
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.position + 1}`;
  }
  openDialog(): void {
    this.dialogRef = this.dialog.open(SampleDataDialogComponent);
    this.dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result: any) => {
        if (result) {
          this.store.dispatch(
            sampleDataActions.createData({
              criteria: this.getSearchCriteria(),
              data: result,
            }),
          );
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
    this.dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result: any) => {
        if (result) {
          {
            this.selectedRow = undefined;
            this.store.dispatch(
              sampleDataActions.updateData({
                criteria: this.getSearchCriteria(),
                data: result,
              }),
            );
          }
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
      .pipe(untilDestroyed(this))
      .subscribe((accept: boolean) => {
        if (accept) {
          this.store.dispatch(
            sampleDataActions.deleteData({
              criteria: this.getSearchCriteria(),
              data: payload,
            }),
          );
          this.selectedRow = undefined;
        }
      });
  }
  filter(): void {
    this.store.dispatch(sampleDataActions.loadData(this.getSearchCriteria()));
    this.pagingBar.firstPage();
  }

  /* @param {*} form
   * @memberof SampleDataGridComponent
   */
  searchReset(form: any): void {
    form.reset();
    this.store.dispatch(sampleDataActions.loadData(this.getSearchCriteria()));
  }
}
