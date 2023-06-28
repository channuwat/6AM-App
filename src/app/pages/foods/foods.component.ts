import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FoodConfigComponent } from './food-config/food-config.component';

@Component({
  selector: 'foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css'],
})
export class FoodsComponent implements OnInit {

  constructor(private modalCtr: NgbModal) { }

  ngOnInit(): void {
  }

  openConfig() {
    const modalRef = this.modalCtr.open(FoodConfigComponent)
  }

}
