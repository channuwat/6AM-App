import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/api.service';
import { PickOptionsComponent } from './pick-options/pick-options.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'food-config',
  templateUrl: './food-config.component.html',
  styleUrls: ['./food-config.component.css']
})
export class FoodConfigComponent implements OnInit {
  @Input() f_id: number | string = 0
  @Input() f_data: any = {}
  formG: FormGroup

  constructor(private modalCtr: NgbModal, public api: ApiService, public modalActive: NgbActiveModal) {
    this.formG = new FormGroup({
      f_id: new FormControl(0),
      f_title: new FormControl(null, Validators.required),
      f_price: new FormControl(0, [Validators.min(0), Validators.required]),
      f_unit: new FormControl(null, Validators.required),
      f_options: new FormControl([])
    })
  }

  ngOnInit(): void {
    this.getUnit()
  }

  units: any[] = []
  getUnit() {
    this.api.getData('UnitCtr/getUnits').then((res: any) => {
      this.units = res
      this.setDefaultDataPassing()
    })
  }

  setDefaultDataPassing() {
    this.formG.patchValue({
      f_id: this.f_id ?? 0,
      f_title: this.f_data.f_title ?? null,
      f_unit: this.f_data.f_unit ?? this.units?.[0]?.un_id ?? '',
      f_price: this.f_data.f_price ?? 0,
    })

    this.optsSelected = this.f_data?.options ?? []
  }

  optsSelected: any[] = []
  pickOptions() {
    const modalRef = this.modalCtr.open(PickOptionsComponent, { size: 'xl' })
    modalRef.result.then((res: any) => {
      if (res.data.length > 0) {
        for (let opts_list of this.optsSelected) {
          let index = 0
          for (let ops_s of res.data) {
            if (ops_s.opts_tp_id == opts_list.opts_tp_id) {
              res.data.splice(index, 1);
            }
            index++
          }
        }

        for(let opts of res.data){
          this.optsSelected.push(opts) 
        }
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

  saveFoods() {
    let f_options: any = (() => {
      let _tmp = []
      for (let opts of this.optsSelected) { _tmp.push(opts.opts_tp_id) }
      return _tmp
    })

    this.formG.patchValue({ f_options: f_options() })
    let form: any = this.formG.value

    this.api.postData('FoodsCtr/saveFoods', form).then((res: any) => {
      if (res.flag) {
        this.api.success()
        this.modalActive.close({ raw: 'callback', data: { flag: res.flag } })
      } else {
        this.api.error()
      }
    })
  }

  close() {
    this.modalActive.close({ raw: 'close', data: { flag: false } })
  }

}
