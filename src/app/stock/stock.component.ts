import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from '../company/Company';
import { CompanyService } from '../company/company.service';
import { RegisterComponent } from '../register/register.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public editStock: any,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.editStock) {
      this.companyModel = this.editStock;
    }
  }

  companyModel: Company = <Company>{};
  addStockPrice(companyCode: String) {
    this.companyService.addStockPrice(companyCode, this.companyModel).subscribe(
      (data) => {
        this.toastr.success('Added the Stock Price', 'Success');
        // window.alert('Successfully added the Stock Price!');
        console.log(data);
        // this.ngOnInit();
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error('Unable to add the Stock Price', 'Failed');
        //window.alert('Unable to add the Stock Price');
        console.log(error);
      }
    );
  }

  completeLogin(login: NgForm) {
    login.reset();
  }
}
