import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL: any = environment.production
  constructor(public http: HttpClient) { }

  getData(segment) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL + segment)//, 
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          if (err.status == 0) {
            console.log(err);
            reject(err);
          }
          reject(err);
        });
    });
  }

  postData(segment, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL + segment, data)//, 
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          if (err.status == 0) {
            console.log(err);
            reject(err);
          }
          reject(err);
        });
    });
  }
}
