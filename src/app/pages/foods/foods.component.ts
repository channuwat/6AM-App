import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FoodConfigComponent } from './food-config/food-config.component';
import { ApiService } from 'app/api.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
})
export class FoodsComponent implements OnInit {
  constructor(private modalCtr: NgbModal, public api: ApiService) { }

  ngOnInit(): void {
    this.getAllFoods()
  }

  foods: any[] = []
  getAllFoods() {
    this.api.getData('FoodsCtr/getAllFoods').then((res: any) => {
      this.foods = res ?? []
    })
  }

  openConfig(f_id: number | string, data: any = {}) {
    const modalRef = this.modalCtr.open(FoodConfigComponent)
    modalRef.componentInstance.f_data = data
    modalRef.componentInstance.f_id = f_id

    modalRef.result.then((res: any) => {
      if (res.data.flag) {
        this.api.success()
        this.getAllFoods()
      }
    })
  }

  delFoods(f_id) {
    Swal.fire({
      title: 'ยืนยันการลบ',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ปิด'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.postData('FoodsCtr/delFoods', { f_id: f_id, f_del: 1 }).then((res: any) => {
          if (res.flag) {
            this.api.success()
            this.getAllFoods()
          } else {
            this.api.error()
          }
        })
      }
    })

  }

  onActiveFood(food: any) {
    let tmp = JSON.parse(JSON.stringify(food))
    food.f_status = food.f_status == 1 ? 0 : 1
    this.api.postData('FoodsCtr/onActiveFood', { f_id: food.f_id, f_status: food.f_status }).then((res: any) => {
      if (res.flag) {
        this.api.alertSuccess()
      } else {
        this.api.alertError()
        food = tmp
      }
    })
  }

}
