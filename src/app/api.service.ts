import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  getData(segment) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8080/' + segment)//, 
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
      this.http.post('http://localhost:8080/' + segment, data)//, 
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
