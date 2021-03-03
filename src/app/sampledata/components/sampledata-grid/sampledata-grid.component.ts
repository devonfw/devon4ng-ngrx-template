import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/security/auth.service';
import { Pageable } from '../../../shared/models/pageable';
import { SampleDataDialogComponent } from '../../components/sampledata-dialog/sampledata-dialog.component';
import { SampleDataModel } from '../../models/sampledata.model';
import { SearchCriteriaDataModel } from '../../models/searchcriteriadata.model';
import { SampleDataService } from '../../services/sampledata.service';
import * as fromStore from '../../store';
import * as sampleDataActions from '../../store/actions/sampledata.actions';
import { SampleDataAlertComponent } from '../sampledata-alert/sampledata-alert.component';

/* @export
 * @class SampleDataGridComponent
 * @implements {OnInit}
 */
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-sampledata-grid-display',
  templateUrl: './sampledata-grid.component.html',
  styleUrls: ['./sampledata-grid.component.scss'],
})
export class SampleDataGridComponent implements OnInit, OnDestroy {
  @ViewChild('pagingBar', { static: true }) pagingBar: MatPaginator;

  data: any = [];

  /* @type {ITdDataTableColumn[]}
   * @memberof SampleDataGridComponent
   */
  columns: any[] = [
    {
      name: 'name',
      label: 'sampledatamanagement.SampleData.columns.name',
    },
    {
      name: 'surname',
      label: 'sampledatamanagement.SampleData.columns.surname',
    },
    {
      name: 'age',
      label: 'sampledatamanagement.SampleData.columns.age',
    },
    {
      name: 'email',
      label: 'sampledatamanagement.SampleData.columns.email',
    },
  ];
  displayedColumns: string[] = ['select', 'name', 'surname', 'age', 'email'];

  totalItems: number;
  pageSize = 8;
  pageSizes: number[] = [8, 16, 24];
  selectedRow: any;
  dialogRef: MatDialogRef<SampleDataDialogComponent>;
  selection: SelectionModel<any> = new SelectionModel<any>(false, []);

  /* @type {*}
   * @memberof SampleDataGridComponent
   */
  searchTerms: any = {
    id: undefined,
    name: undefined,
    surname: undefined,
    age: undefined,
    email: undefined,
    modificationCounter: undefined,
    pageSize: undefined,
    pagination: undefined,
    searchTerms: undefined,
  };

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
    private translocoService: TranslocoService,
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

    this.store.dispatch(
      sampleDataActions.loadData({
        sampleDataModel: this.getSearchCriteria(),
      }),
    );
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

  getSearchCriteria() {
    return {
      size: this.pageable.pageSize,
      page: this.pageable.pageNumber,
      searchTerms: { ...this.searchTerms },
      sort: (this.pageable.sort = this.sorting),
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

    this.store.dispatch(
      sampleDataActions.loadData({
        sampleDataModel: this.getSearchCriteria(),
      }),
    );
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
    this.store.dispatch(
      sampleDataActions.loadData({
        sampleDataModel: this.getSearchCriteria(),
      }),
    );
  }
  checkboxLabel(row?: any): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
  openDialog(): void {
    this.dialogRef = this.dialog.open(SampleDataDialogComponent);
    this.dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result: any) => {
        if (result) {
          const searchCriteriaDataModel: SearchCriteriaDataModel = {
            criteria: this.getSearchCriteria(),
            data: result,
          };
          this.store.dispatch(
            sampleDataActions.createData({ searchCriteriaDataModel }),
          );
        }
      });
  }
  /* @param {*} e
   * @memberof SampleDataGridComponent
   */
  selectEvent(row: any): void {
    this.selection.toggle(row);
    this.selectedRow = this.selection.isSelected(row) ? row : undefined;
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
            const searchCriteriaDataModel: SearchCriteriaDataModel = {
              criteria: this.getSearchCriteria(),
              data: result,
            };
            this.store.dispatch(
              sampleDataActions.updateData({ searchCriteriaDataModel }),
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
      sort: (this.pageable.sort = this.sorting),
    };
    this.dialog
      .open(SampleDataAlertComponent, {
        width: '400px',
        data: {
          message: this.translocoService.translate(
            'sampledatamanagement.alert.message',
          ),
          title: this.translocoService.translate(
            'sampledatamanagement.alert.title',
          ),
          cancelButton: this.translocoService.translate(
            'sampledatamanagement.alert.cancelBtn',
          ),
          acceptButton: this.translocoService.translate(
            'sampledatamanagement.alert.acceptBtn',
          ),
        },
      })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((accept: boolean) => {
        if (accept) {
          const searchCriteriaDataModel: SearchCriteriaDataModel = {
            criteria: this.getSearchCriteria(),
            data: payload,
          };
          this.store.dispatch(
            sampleDataActions.deleteData({ searchCriteriaDataModel }),
          );
          this.selectedRow = undefined;
        }
      });
  }
  filter(): void {
    this.store.dispatch(
      sampleDataActions.loadData({
        sampleDataModel: this.getSearchCriteria(),
      }),
    );
    this.pagingBar.firstPage();
  }

  /* @param {*} form
   * @memberof SampleDataGridComponent
   */
  searchReset(form: any): void {
    form.reset();
    this.store.dispatch(
      sampleDataActions.loadData({
        sampleDataModel: this.getSearchCriteria(),
      }),
    );
  }
}
