import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/api.service';
import { PickOptionsComponent } from './pick-options/pick-options.component';

@Component({
  selector: 'food-config',
  templateUrl: './food-config.component.html',
  styleUrls: ['./food-config.component.css']
})
export class FoodConfigComponent implements OnInit {

  constructor(private modalCtr: NgbModal, public api: ApiService) { }

  ngOnInit(): void {
  }

  optsSelected: any[] = []
  pickOptions() {
    const modalRef = this.modalCtr.open(PickOptionsComponent, { size: 'xl' })
    modalRef.result.then((res: any) => {
      if (res.data.length > 0) {
        this.optsSelected = res.data
      }
    })
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

}
