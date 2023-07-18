import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'ie-config',
  templateUrl: './ie-config.component.html',
  styleUrls: ['./ie-config.component.css']
})
export class IeConfigComponent implements OnInit {
  formG: FormGroup
  @Input() IE_data: any = {}
  constructor(public api: ApiService, public modalActive: NgbActiveModal) { }

  ngOnInit(): void {
    this.formG = new FormGroup({
      ie_id: new FormControl(0, Validators.required),
      ie_type: new FormControl(1, Validators.required),
      ie_pay_type: new FormControl(0, Validators.required),
      ie_text: new FormControl(null, Validators.required),
      ie_amount: new FormControl(0, [Validators.required, Validators.min(0)]),
    })

    if (this.IE_data.ie_id > 0) {
      this.setDefaultData()
    }
  }

  setDefaultData() {
    this.formG.patchValue({
      ie_id: this.IE_data.ie_id,
      ie_type: this.IE_data.ie_type,
      ie_pay_type: this.IE_data.ie_pay_type,
      ie_text: this.IE_data.ie_text,
      ie_amount: this.IE_data.ie_amount,
    })
  }

  setTypeList() {
    this.formG.patchValue({ ie_pay_type: 1 })
    if (this.formG.value.ie_type == 1) {
      this.formG.patchValue({ ie_pay_type: 0 })
    }
  }

  saveIE() {
    let form: any = this.formG.value
    this.api.postData('IECtr/saveIE', form).then((res: any) => {
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
