// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class DeletedataService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import {
  ITdDataTableColumn,
  TdDataTableComponent,
} from '@covalent/core';

import { MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/security/auth.service';
import { SampleDataDialogComponent } from '../../sampledata/sampledata-dialog/sampledata-dialog.component';
import { Pagination } from '../../core/interfaces/pagination';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DeletedataService  implements OnInit {
  private urlService: string = environment.restServiceRoot +
  'sampledatamanagement/v1/sampledata/';

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
    name: undefined,
    surname: undefined,
    age: undefined,
    email: undefined,
  };
  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    public dialog: MatDialog,
    public authService: AuthService,
    public router: Router,
   
  ) {}

  ngOnInit(): void {
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
  
  
delete(){
  
}


  DeleteDataDB(id: number): Observable<any> {
   
      return this.http.delete(this.urlService + id);
    }

    
     
  }


 

