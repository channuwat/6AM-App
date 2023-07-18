import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/api.service';
import { IeConfigComponent } from './ie-config/ie-config.component';

@Component({
  selector: 'income-expenses',
  templateUrl: './income-expenses.component.html',
  styleUrls: ['./income-expenses.component.css']
})
export class IncomeExpensesComponent implements OnInit {

  constructor(public api: ApiService, public modalCtr: NgbModal) { }

  ngOnInit(): void {
    this.getAllIncomeExpeness()
  }

  getAllIncomeExpeness(){

  }

  openConfig(id: number | string = 0, data: any = {}) {
    const modalRef = this.modalCtr.open(IeConfigComponent)
    modalRef.componentInstance.f_data = data
    modalRef.componentInstance.f_id = id

    modalRef.result.then((res: any) => {
      if (res.data.flag) {
        this.api.success()
        this.getAllIncomeExpeness()
      }
    })
  }

}
