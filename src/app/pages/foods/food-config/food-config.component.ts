import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/api.service';
import { PickOptionsComponent } from './pick-options/pick-options.component';

@Component({
  selector: 'food-config',
  templateUrl: './food-config.component.html',
  styleUrls: ['./food-config.component.css']
})
export class FoodConfigComponent implements OnInit {

  constructor(private modalCtr: NgbModal, public api: ApiService) { }

  ngOnInit(): void {
  }

  pickOptions(){
    const modalRef = this.modalCtr.open(PickOptionsComponent,{size:'xl'})
  }

}
