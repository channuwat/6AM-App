import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'config-order',
  templateUrl: './config-order.component.html',
  styleUrls: ['./config-order.component.css']
})
export class ConfigOrderComponent implements OnInit {

  constructor(public api: ApiService, public modalActive: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
