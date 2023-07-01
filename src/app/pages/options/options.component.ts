import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/api.service';
import { OptionsConfigComponent } from './options-config/options-config.component';

@Component({
  selector: 'options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(private modalCtr: NgbModal, public api: ApiService) { }

  ngOnInit(): void {
    this.getAllOptsions()
  }

  options_list: any[] = []
  getAllOptsions() {
    this.api.getData('OptionsCtr/getAllOptsions').then((res: any) => {
      this.options_list = res
    })
  }

  openConfig(opts_tp_id: number | string, data: any = {}) {
    const modalRef = this.modalCtr.open(OptionsConfigComponent)
    modalRef.componentInstance.opts_data = data
    modalRef.componentInstance.opts_tp_id = opts_tp_id

    modalRef.result.then((res: any) => {
      if (res.data.flag) {
        this.getAllOptsions()
      }
    })
  }

  delOptions(opts_tp_id) {
    this.api.postData('OptionsCtr/delOptions', { opts_tp_id: opts_tp_id, opts_del: 1 }).then((res: any) => {
      if (res.flag) {
        this.getAllOptsions()
      }
    })
  }

}
