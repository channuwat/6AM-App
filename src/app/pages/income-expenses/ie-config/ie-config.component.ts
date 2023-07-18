import { Component, OnInit } from '@angular/core';
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
  constructor(public api: ApiService, public modalActive: NgbActiveModal) { }

  ngOnInit(): void {
    this.formG = new FormGroup({
      ie_type: new FormControl(1, Validators.required),
      ie_pay_type: new FormControl(0, Validators.required),
      ie_text: new FormControl(null, Validators.required),
      ie_amount: new FormControl(0, [Validators.required, Validators.min(0)]),
    })
  }

  setTypeList() {
    this.formG.patchValue({ ie_pay_type: 1 })
    if (this.formG.value.ie_type == 1) {
      this.formG.patchValue({ ie_pay_type: 0 })
    }
  }

  saveIE() {
  }

  close() {
    this.modalActive.close({ raw: 'close', data: { flag: false } })
  }

}
