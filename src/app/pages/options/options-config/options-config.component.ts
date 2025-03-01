import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'options-config',
  templateUrl: './options-config.component.html',
  styleUrls: ['./options-config.component.css']
})
export class OptionsConfigComponent implements OnInit {
  @Input() opts_tp_id: number | string = 0
  @Input() opts_data: any = {}
  formG: FormGroup

  constructor(public api: ApiService, public modalActive: NgbActiveModal) {
    this.formG = new FormGroup({
      opts_tp_id: new FormControl(0),
      opts_title: new FormControl(null, Validators.required),
      opts_unit: new FormControl(null, Validators.required),
      opts_price: new FormControl(0, [Validators.min(0), Validators.required]),
    })
  }

  ngOnInit(): void {
    this.getUnit()
  }

  setDefaultDataPassing() {
    this.formG.patchValue({
      opts_tp_id: this.opts_tp_id ?? 0,
      opts_title: this.opts_data.opts_title ?? null,
      opts_unit: this.opts_data.opts_unit ?? this.units?.[0]?.un_id ?? '',
      opts_price: this.opts_data.opts_price ?? 0,
    })
  }

  units: any[] = []
  getUnit() {
    this.api.getData('UnitCtr/getUnits').then((res: any) => {
      this.units = res
      this.setDefaultDataPassing()
    })
  }

  saveOptions() {
    let form: any = this.formG.value
    this.api.postData('OptionsCtr/saveOptions', form).then((res: any) => {
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
