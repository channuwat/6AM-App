import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'pick-options',
  templateUrl: './pick-options.component.html',
  styleUrls: ['./pick-options.component.css']
})
export class PickOptionsComponent implements OnInit {

  constructor(public api: ApiService, public modalActive: NgbActiveModal) {

  }

  ngOnInit(): void {
    this.getAllOptions()
  }

  options_list: any[] = []
  getAllOptions() {
    this.api.getData('OptionsCtr/getAllOptions').then((res: any) => {
      this.options_list = res
    })
  }

  optsSelected: any[] = []
  pickOption(opts: any = null) {
    let isValid: any = this.optsSelected.filter((_opts) => {
      return _opts.opts_tp_id == opts.opts_tp_id
    })

    isValid = isValid?.[0] ?? []

    if (isValid == false) {
      this.optsSelected.push(opts)
    }

  }

  deleteOpts(opts_tp_id: number = 0) {
    let tmp_del: any[] = []

    for (let item of this.optsSelected) {
      if (item.opts_tp_id != opts_tp_id) {
        tmp_del.push(item)
      }
    }

    this.optsSelected = tmp_del
  }

  saveOptsSelected() {
    if (this.optsSelected.length > 0) {
      this.modalActive.close({ raw: 'callback', data: this.optsSelected })
    }
  }

}
