import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/api.service';
import { IeConfigComponent } from './ie-config/ie-config.component';
var moment = require('moment');
import Swal from 'sweetalert2'

@Component({
  selector: 'income-expenses',
  templateUrl: './income-expenses.component.html',
  styleUrls: ['./income-expenses.component.css']
})
export class IncomeExpensesComponent implements OnInit {
  dateSearch: string = moment().format('YYYY-MM-DD');
  constructor(public api: ApiService, public modalCtr: NgbModal) { }

  ngOnInit(): void {
    this.getAllIncomeExpeness()
  }

  ie_data: any[] = []
  getAllIncomeExpeness() {
    this.api.getData('IECtr/getAllIncomeExpenses/' + this.dateSearch).then((res: any) => {
      this.ie_data = res
    })
  }

  openConfig(data: any = {}) {
    const modalRef = this.modalCtr.open(IeConfigComponent)
    modalRef.componentInstance.IE_data = data

    modalRef.result.then((res: any) => {
      if (res.data.flag) {
        this.api.success()
        this.getAllIncomeExpeness()
      }
    })
  }

  delIE(ie_id) {
    Swal.fire({
      title: 'ยืนยันการลบ',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ปิด'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.postData('IECtr/delIE', { ie_id: ie_id, ie_del: 1 }).then((res: any) => {
          if (res.flag) {
            this.api.success()
            this.getAllIncomeExpeness()
          } else {
            this.api.error()
          }
        })
      }
    })

  }

}
