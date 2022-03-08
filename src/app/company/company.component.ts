import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Company } from './Company';
import { CompanyService } from './company.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { StockComponent } from '../stock/stock.component';
import { StockUpdateComponent } from '../stock-update/stock-update.component';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class CompanyComponent implements OnInit {
  private searchEventSubscription: Subscription | any;
  displayedColumns: string[] = [
    'companyCode',
    'companyName',
    'companyCeo',
    'turnOver',
    'companyWebsite',
    'stockExchange',
    'stockPrice',
    'action',
  ];
  dataSource!: MatTableDataSource<Company>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private http: HttpClient,
    private companyService: CompanyService,
    private matDialog: MatDialog,
    private messageService: MessageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.viewAllCompanyDetails();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editInfoDialog(row: any) {
    this.matDialog
      .open(RegisterComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((data) => {
        {
          this.viewAllCompanyDetails();
        }
      });
  }

  editStockDialog(row: any) {
    this.matDialog
      .open(StockComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((data) => {
        this.viewAllCompanyDetails();
      });
  }

  editStockUpdateDialog(row: any) {
    this.matDialog
      .open(StockUpdateComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((data) => {
        this.viewAllCompanyDetails();
      });
  }
  openDialog() {
    this.matDialog
      .open(RegisterComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((data) => {
        this.viewAllCompanyDetails();
      });
  }

  data: {} | any;
  companyModel: Company = <Company>{};
  companyGet: Company = <Company>{};
  companyDel: Company = <Company>{};
  companyAddStock: Company = <Company>{};
  companyUpdateStock: Company = <Company>{};
  companyArr: Company[] = [];
  maxArr: Company[] = [];
  avg: Number = 0;

  // registerCompany() {
  //   this.companyService.registerCompany(this.companyModel).subscribe(
  //     (data) => {
  //       // window.alert('Company registered Successfully !');
  //       this.data = JSON.stringify(data);
  //       this.companyArr.push(this.data);
  //       this.companyArr = Object.values(data);
  //     },
  //     (error) => {
  //       window.alert('Unable to Register Company');
  //     }
  //   );
  // }

  viewAllCompanyDetails() {
    this.companyService.getallCompanyDetails().subscribe(
      (data) => {
        //console.log(Object.values(data));
        //this.companyArr = Object.values(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
        window.alert('Unable to retrieve  Registered Company Details');
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyCustomFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = function (
      data: Company,
      filterValue: string
    ): boolean {
      return data.companyCode.toLowerCase().includes(filterValue);
    };

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteCompany(companyCode: String) {
    this.companyService.deleteCompany(companyCode).subscribe(
      (data) => {
        // window.alert('Company deleted successfully!');
        console.log('Company is removed from the StockMarket!', data);
        let companyIndex = this.companyArr.findIndex(
          (c) => c.companyCode === companyCode
        );
        console.log(companyIndex);
        this.companyArr.splice(companyIndex, 1);
        //this.dataSource.data.
        this.toastr.success('Deleted the Company', 'Success');
        this.viewAllCompanyDetails();
      },
      (error) => {
        this.toastr.error('Unable to delete the Company', 'Failed');
        console.log(error);
      }
    );
  }

  getCompany(companyCode: String) {
    this.companyService.getInfo(companyCode).subscribe(
      (data) => {
        console.log(Object.values(data));
        this.companyGet = data;
      },
      (error) => {
        console.log(error);
        window.alert('Unable to retrieve the details of the Company!');
      }
    );
  }

  addStockPrice(companyCode: String) {
    this.companyService.addStockPrice(companyCode, this.companyModel).subscribe(
      (data) => {
        this.toastr.success('Added the Stock Price', 'Success');
        console.log(data);
        this.ngOnInit();
      },
      (error) => {
        this.toastr.error('Unable to add the Stock Price', 'Failed');
        console.log(error);
      }
    );
  }

  updateStockPrice(companyCode: String) {
    this.companyService
      .updateStockPrice(companyCode, this.companyModel)
      .subscribe(
        (data) => {
          window.alert('Successfully updated the Stock Price!');
          console.log(data);
          this.ngOnInit();
        },
        (error) => {
          window.alert('Unable to update the Stock Price');
          console.log(error);
        }
      );
  }
  getMaxStock() {
    this.companyService.getMaxStock().subscribe(
      (data) => {
        console.log(data);
        // this.maxArr = Object.values(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getMinStock() {
    this.companyService.getMinStock().subscribe(
      (data) => {
        console.log(data);
        //this.maxArr = Object.values(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAvgStock() {
    this.companyService.getAvgStock().subscribe(
      (data) => {
        console.log(data);
        this.avg = data;
        //this.maxArr = Object.values(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  completeLogin(login: NgForm) {
    login.reset();
  }
}
