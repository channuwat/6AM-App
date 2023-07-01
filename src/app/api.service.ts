import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL: any = environment.baseURL
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
      this.http.post(this.baseURL + segment, JSON.stringify(data))//, 
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

  success(ms: string = 'บันทึกสำเร็จ!') {
    Swal.fire({
      title: ms,
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'ตกลง',
      timer: 2000
    })
  }

  error(ms: string = 'บันทึกผิดผลาด!') {
    Swal.fire({
      title: ms,
      icon: 'error',
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'ปิด',
      timer: 2000
    })
  }
}
