import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/api.service';
var moment = require('moment');
import Swal from 'sweetalert2'
import { ConfigOrderComponent } from './config-order/config-order.component';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  dateSearch: string = moment().format('YYYY-MM-DD');
  constructor(public api: ApiService, public modalCtr: NgbModal) { }

  ngOnInit(): void {
    this.loadAllOrders()
  }

  orders: any = []
  loadAllOrders() {
    this.api.getData('OrderCtr/loadAllOrders/' + this.dateSearch).then((res: any) => {
      this.orders = res
    })
  }

  openConfig(od_id: number = 0, order_data: any = []) {
    const modalRef = this.modalCtr.open(ConfigOrderComponent, { size: 'xl' })
    modalRef.componentInstance.order_data = order_data
    modalRef.componentInstance.od_id = od_id

    modalRef.result.then((res: any) => {
      if (res.data.flag) {
        this.api.success()
        this.loadAllOrders()
      }
    })
  }

  delFoods(od_id: number = 0) {

  }

  updateStatusOrder(od_id: number = 0, od_status: number) {
    let remark: string = ''
    if (od_status == 103) {
      remark = 'order canceled'
    }
    this.api.postData('OrderCtr/updateStatusOrder', { od_id: od_id, od_status: od_status, remark_cancel: remark }).then((res: any) => {
      if (res.flag) {
        this.api.success()
        this.loadAllOrders()
      } else {
        this.api.error()
      }
    })
  }

}
