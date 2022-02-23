import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from './Company';
//import { Company } from './Company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  companyArr: Company[] | any;

  private apiGet: string =
    'http://localhost:8080/api/v1.0/market/company/getall';
  private apiPost: string =
    'http://localhost:8080/api/v1.0/market/company/register';
  private apiDel: string =
    'http://localhost:8080/api/v1.0/market/company/delete';
  private apiGetOne: String =
    'http://localhost:8080/api/v1.0/market/company/info';
  private apiAddStockPrice: String =
    'http://localhost:8080/api/v1.0/market/stock/add';

  private apiUpdateStock: String =
    'http://localhost:8080/api/v1.0/market/stock/put';

  registerCompany(companyModel: Company): Observable<Company> {
    console.log(companyModel);
    return this.http.post<Company>(this.apiPost, companyModel);
  }

  getallCompanyDetails(): Observable<Array<Company>> {
    return this.http.get<Array<Company>>(this.apiGet);
  }

  deleteCompany(companyId: String): Observable<Company> {
    return this.http.delete<Company>(`${this.apiDel}/${companyId}`);
  }

  getInfo(companyId: String): Observable<Company> {
    return this.http.get<Company>(`${this.apiGetOne}/${companyId}`);
  }

  addStockPrice(companyId: String, companyModel: Company): Observable<string> {
    return this.http.post<string>(
      `${this.apiAddStockPrice}/${companyId}`,
      companyModel
    );
  }

  updateStockPrice(
    companyId: String,
    companyModel: Company
  ): Observable<string> {
    return this.http.put<string>(
      this.apiUpdateStock + '/' + companyId,
      companyModel
    );
  }
}
