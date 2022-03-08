import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/Company';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyComponent } from '../company/company.component';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public editInfo: any,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private messageService: MessageService,
    private toastr: ToastrService
  ) {}
  data: {} | any;
  companyArr: Company[] = [];
  companyModel: Company = <Company>{};
  Actionbtn: string = 'Register';
  ngOnInit(): void {
    // console.log(this.editInfo);
    if (this.editInfo) {
      this.companyModel = this.editInfo;
      this.Actionbtn = 'Update';
      // this.companyModel.companyCode = this.editInfo.companyCode;
      // this.companyModel.companyCeo = this.editInfo.companyCeo;
      // this.companyModel.companyName = this.editInfo.companyName;
      // this.companyModel.companyCode = this.editInfo.companyCode;
      // this.companyModel.companyCode = this.editInfo.companyCode;
    }
  }
  registerCompany() {
    if (!this.editInfo) {
      this.companyService.registerCompany(this.companyModel).subscribe(
        (data) => {
          //window.alert('Company registered Successfully !');
          this.data = JSON.stringify(data);
          // this.companyArr.push(this.data);
          //this.ngOnInit();
          this.toastr.success('Registered the Company', 'Success!');
          this.dialogRef.close('saved');

          //this.companyArr = Object.values(data);
        },
        (error) => {
          //window.alert('Unable to Register Company');
          this.toastr.error('Unable to register the Company', 'Failed!');
        }
      );
    } else {
      this.companyService.updateCompany(this.companyModel).subscribe(
        (data) => {
          //window.alert('Company updated Successfully !');
          this.toastr.success('Updated the Company Details', 'Success!');
          this.dialogRef.close();
        },
        (error) => {
          this.toastr.error('Unable to update the Company Details', 'Failed!');
        }
      );
    }
  }

  completeLogin(login: NgForm) {
    login.reset();
  }
}
