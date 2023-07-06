import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/api.service';
import { SelectOptionsFoodComponent } from './select-options-food/select-options-food.component';

@Component({
  selector: 'config-order',
  templateUrl: './config-order.component.html',
  styleUrls: ['./config-order.component.css']
})
export class ConfigOrderComponent implements OnInit {

  constructor(public api: ApiService, public modalActive: NgbActiveModal, public modalCtr: NgbModal) { }

  ngOnInit(): void {
    this.getAllFoods()
  }

  foods: any[] = []
  getAllFoods() {
    this.api.getData('FoodsCtr/getAllFoods').then((res: any) => {
      this.foods = res ?? []
    })
  }

  cart: any[] = []
  optionsFoods(f: any) {
    f.count = 1
    if (f.options.length > 0) {
      const modalRef = this.modalCtr.open(SelectOptionsFoodComponent)
      modalRef.componentInstance.options = f.options

      modalRef.result.then((res: any) => {
        if (res.data.options_pick.length > 0) {
          f.options_pick = res.data.options_pick
          this.cart.push(f)
        }
      })

    } else {
      this.cart.push(f)
    }
  }

  addAmount(type: number, c: any, index: number) {
    c.count += type
    if (c.count < 1) {
      this.cart.splice(index, 1)
    }
  }

}
