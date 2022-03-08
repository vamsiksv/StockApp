import { Component } from '@angular/core';
import { window } from 'rxjs';
import { Location } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { CompanyComponent } from './company/company.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'StockApp';
  constructor(private Matdialog: MatDialog) {}
  // openDialog() {
  //   this.Matdialog.open(RegisterComponent, {
  //     width: '30%',
  //   })
  //     .afterClosed()
  //     .subscribe((data) => {});
  // }
}
