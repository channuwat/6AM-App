import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/api.service';
import { OptionsConfigComponent } from './options-config/options-config.component';

import Swal from 'sweetalert2'

@Component({
  selector: 'options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(private modalCtr: NgbModal, public api: ApiService) { }

  ngOnInit(): void {
    this.getAllOptions()
  }

  options_list: any[] = []
  getAllOptions() {
    this.api.getData('OptionsCtr/getAllOptions').then((res: any) => {
      this.options_list = res
    })
  }

  openConfig(opts_tp_id: number | string, data: any = {}) {
    const modalRef = this.modalCtr.open(OptionsConfigComponent)
    modalRef.componentInstance.opts_data = data
    modalRef.componentInstance.opts_tp_id = opts_tp_id

    modalRef.result.then((res: any) => {
      if (res.data.flag) {
        this.getAllOptions()
      }
    })
  }

  delOptions(opts_tp_id) {
    Swal.fire({
      title: 'ยืนยันการลบ',
      icon: 'question',
      showCancelButton:true,
      confirmButtonText:'ยืนยัน',
      cancelButtonText:'ปิด'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.postData('OptionsCtr/delOptions', { opts_tp_id: opts_tp_id, opts_del: 1 }).then((res: any) => {
          if (res.flag) {
            this.api.success()
            this.getAllOptions()
          }else{
            this.api.error()
          }
        })
      }
    })

  }

  onActiveOptions(otps: any) {
    let tmp = JSON.parse(JSON.stringify(otps))
    otps.opts_status = otps.opts_status == 1 ? 0 : 1
    this.api.postData('OptionsCtr/onActiveOptions', { opts_tp_id: otps.opts_tp_id, opts_status: otps.opts_status }).then((res: any) => {
      if (res.flag) {
        this.api.alertSuccess()
      } else {
        this.api.alertError()
        otps = tmp
      }
    })
  }

}
