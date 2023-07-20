import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/api.service';
import { SelectOptionsFoodComponent } from './select-options-food/select-options-food.component';

@Component({
  selector: 'config-order',
  templateUrl: './config-order.component.html',
  styleUrls: ['./config-order.component.css']
})
export class ConfigOrderComponent implements OnInit {
  @Input() order_data: any = {}
  @Input() od_id: any = 0

  type_order: any = [
    { id: 100, title: 'กลับบ้าน', discount: 0, type: '฿' },
    { id: 200, title: 'ทานที่ร้าน', discount: 0, type: '฿' },
    { id: 300, title: 'Grab (-32%)', discount: 32, type: '%' },
  ]
  type_order_pick: any = this.type_order[0]
  remark: string = ''

  constructor(public api: ApiService, public modalActive: NgbActiveModal, public modalCtr: NgbModal, public ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllFoods()
    this.setDefaultData()
  }

  setDefaultData() {
    this.order_data = this.api.copy(this.order_data)
    for (let od of this.order_data.order_detail) {
      this.type_order_pick = (() => {
        let type = this.type_order.filter((item) => {
          return item.id == this.order_data.od_type
        })
        return type[0]
      })()
      this.setDiscount()
      
      od.f_title = od.f_title
      od.options_pick = od.od_d_options
      od.count = od.od_d_count - 0
      od.f_price = od.od_d_price - 0
      od.sum = od.od_d_sum - 0
    }
    this.cart = this.order_data.order_detail

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
    _f.count = 0
    _f.options_pick = []
    if (_f.options.length > 0) {
      // มี topping //
      const modalRef = this.modalCtr.open(SelectOptionsFoodComponent)
      modalRef.componentInstance.options = _f.options

      modalRef.result.then((res: any) => {
        _f.options_pick = res.data.options_pick

        if (this.cart.length > 0) {
          // มี cart //
          let inArray: any = this.cart.filter((c) => {
            return c.f_id == _f.f_id
          })

          if (inArray.length > 0) {
            let diff: number = 0
            for (let inA of inArray) {
              let _options_pick = JSON.stringify(_f.options_pick)
              let options_pick = JSON.stringify(inA.options_pick)
              if (_options_pick == options_pick) {
                inA.count++
                inA.sum = this.sumByitem(inA.f_price - 0, inA.options_pick) * inA.count
                diff = 0
                break
              } else {
                diff++
              }
            }
            if (diff > 0) {
              _f.count++
              _f.sum = this.sumByitem(_f.f_price - 0, _f.options_pick) * _f.count
              this.cart.push(_f)
            }
          } else {
            _f.count++
            _f.sum = this.sumByitem(_f.f_price - 0, _f.options_pick) * _f.count
            this.cart.push(_f)
          }
        } else {
          // ไม่มี cart //
          _f.count++
          _f.sum = this.sumByitem(_f.f_price - 0, _f.options_pick) * _f.count
          this.cart.push(_f)
        }
      })
    } else {
      // ไม่มี topping //
      if (this.cart.length > 0) {
        let noArray: number = 0
        for (let c of this.cart) {
          if (c.f_id == _f.f_id) {
            // id = id ในตะกร้า //
            c.count++
            c.sum = (c.f_price - 0) * c.count
            noArray = 0
            break
          } else {
            // id != id ในตะกร้า //
            noArray++
          }
        }

        if (noArray > 0) {
          // id != id ในตะกร้า //
          _f.count++
          _f.sum = (_f.f_price - 0) * _f.count
          this.cart.push(_f)
        }
      } else {
        _f.count++
        _f.sum = (_f.f_price - 0) * _f.count
        this.cart.push(_f)
      }
    }
  }

  sumByitem(price: number = 0, options: any = []) {
    let sum_price: number = 0
    for (let opts of options) {
      sum_price += opts.opts_price - 0
    }
    sum_price += price
    return sum_price
  }


  discountType: any = { discount: 0, type: '฿' }
  sumPrice() {
    let sum: number | string = 0
    for (let c of this.cart) {
      let sum_list: number = 0
      if (c.options_pick.length > 0) {
        for (let _c of c.options_pick) {
          sum_list += _c.opts_price - 0
        }
      }
      sum += ((c.f_price - 0) + sum_list) * c.count
    }

    if (this.discountType.type == '%') {
      let discount = (sum * this.discountType.discount) / 100
      sum -= discount
    } else {
      sum -= this.discountType.discount
    }

    if (sum < 0) {
      sum = 'Error'
    }

    return sum
  }

  async addAmount(type: number, c: any, index: number) {
    c.count += await type
    c.sum = c.sum ?? 0
    let sum_beforce: number = this.sumByitem(c.f_price - 0, c.options_pick)

    if (type < 1) {
      c.sum -= sum_beforce
    } else {
      c.sum += sum_beforce
    }
    setTimeout(() => {
      this.ref.detectChanges()
    }, 500);

    if (c.count < 1) {
      this.cart.splice(index, 1)
    }
  }

  setDiscount() {
    this.discountType.discount = this.type_order_pick.discount
    this.discountType.type = this.type_order_pick.type
  }

  minDiscount() {
    if (this.discountType.discount < 0) {
      this.discountType.discount = 0
    }
  }

  saveOrder() {
    let form_data: any = {
      order_id: this.od_id,
      discount: this.discountType.discount,
      discountType: this.discountType.type == '฿' ? 1 : 2,
      order_type: this.type_order_pick.id,
      order_detail: this.cart,
      remark: this.remark
    }

    let api: string = 'addOrder'
    if (this.od_id > 0) {
      api = 'updateOrder'
    }

    this.api.postData('OrderCtr/' + api, form_data).then((res: any) => {
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
