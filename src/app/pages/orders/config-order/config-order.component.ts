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
    let _f = this.api.copy(f)
    _f.count = 1
    _f.options_pick = []
    if (_f.options.length > 0) {
      const modalRef = this.modalCtr.open(SelectOptionsFoodComponent)
      modalRef.componentInstance.options = _f.options

      modalRef.result.then((res: any) => {
        if (res.data.options_pick.length > 0) {
          _f.options_pick = res.data.options_pick
          for (let c of this.cart) {
            if (c.f_id == _f.f_id) {
              let _options_pick = JSON.stringify(_f.options_pick)
              let options_pick = JSON.stringify(c.options_pick)
              if (_options_pick == options_pick) {
                c.count++
              }
              break
            }
          }
        }

        let sum_price: number = 0
        for (let opts of _f.options_pick) {
          sum_price += opts.opts_price - 0
        }
        sum_price += _f.f_price - 0
        _f.sum = sum_price
        this.cart.push(_f)
      })

    } else {
      this.cart.push(_f)
    }
  }

  sumPrice() {
    let sum: number = 0
    for (let c of this.cart) {
      if (c.options_pick.length > 0) {
        for(let _c of c.options_pick){
          sum += _c.opts_price - 0
        }
      }
      sum += c.f_price - 0
      console.log(c.f_price);
      
    }
    return sum
  }

  addAmount(type: number, c: any, index: number) {
    c.count += type
    if (c.count < 1) {
      this.cart.splice(index, 1)
    }
  }

}
