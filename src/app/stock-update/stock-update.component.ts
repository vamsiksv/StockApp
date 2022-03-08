import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from '../company/Company';
import { CompanyService } from '../company/company.service';
import { RegisterComponent } from '../register/register.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stock-update',
  templateUrl: './stock-update.component.html',
  styleUrls: ['./stock-update.component.css'],
})
export class StockUpdateComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public editStock: any,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private toastr: ToastrService
  ) {}

  companyModel: Company = <Company>{};
  ngOnInit(): void {
    if (this.editStock) {
      this.companyModel = this.editStock;
    }
  }

  updateStockPrice(companyCode: String) {
    this.companyService
      .updateStockPrice(companyCode, this.companyModel)
      .subscribe(
        (data) => {
          // alert('Successfully updated the Stock Price!');
          console.log(data);
          // this.ngOnInit();
          this.toastr.success('Update the Stock Price', 'Success');
          this.dialogRef.close();
        },
        (error) => {
          this.toastr.error('Unable to update the Stock Price', 'Failed!!');
          console.log(error);
        }
      );
  }

  completeLogin(login: NgForm) {
    login.reset();
  }
}
