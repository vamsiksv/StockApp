import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Company } from './Company';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  private searchEventSubscription: Subscription | any;
  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.viewAllCompanyDetails();
  }

  data: {} | any;
  companyModel: Company = <Company>{};
  companyGet: Company = <Company>{};
  companyDel: Company = <Company>{};
  companyAddStock: Company = <Company>{};
  companyUpdateStock: Company = <Company>{};
  companyArr: Company[] = [];

  registerCompany() {
    this.companyService.registerCompany(this.companyModel).subscribe(
      (data) => {
        window.alert('Company registered Successfully !');
        this.data = JSON.stringify(data);
        this.companyArr.push(this.data);
        this.ngOnInit();
        //this.companyArr = Object.values(data);
      },
      (error) => {
        window.alert('Unable to Register Company');
      }
    );
  }

  viewAllCompanyDetails() {
    this.companyService.getallCompanyDetails().subscribe(
      (data) => {
        //console.log(Object.values(data));
        this.companyArr = Object.values(data);
      },
      (error) => {
        console.log(error);
        window.alert('Unable to retrieve  Registered Company Details');
      }
    );
  }

  deleteCompany(companyCode: String) {
    this.companyService.deleteCompany(companyCode).subscribe(
      (data) => {
        window.alert('Company deleted successfully!');
        console.log('Company is removed from the StockMarket!', data);
        let companyIndex = this.companyArr.findIndex(
          (c) => c.companyCode === companyCode
        );
        console.log(companyIndex);
        this.companyArr.splice(companyIndex, 1);
        this.viewAllCompanyDetails();
      },
      (error) => {
        window.alert('Unable to delete the Company!');
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
        window.alert('Successfully added the Stock Price!');
        console.log(data);
        this.ngOnInit();
      },
      (error) => {
        window.alert('Unable to add the Stock Price');
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

  completeLogin(login: NgForm) {
    login.reset();
  }
}
