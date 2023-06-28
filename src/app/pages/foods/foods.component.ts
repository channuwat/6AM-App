import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FoodConfigComponent } from './food-config/food-config.component';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
})
export class FoodsComponent implements OnInit {

  constructor(private modalCtr: NgbModal, public api: ApiService) { }

  ngOnInit(): void {
    this.api.postData('api/demo',{a:5}).then((res: any) => {
      console.log(res);

    })
  }

  openConfig() {
    const modalRef = this.modalCtr.open(FoodConfigComponent)
  }

}
