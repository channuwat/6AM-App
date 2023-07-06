import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'select-options-food',
  templateUrl: './select-options-food.component.html',
  styleUrls: ['./select-options-food.component.css']
})
export class SelectOptionsFoodComponent implements OnInit {
  @Input() options: any = []
  constructor(public modalActive: NgbActiveModal) { }

  ngOnInit(): void {
  }

  _options: any = []
  saveOptions() {
    for(let opts of this.options){
      if(opts.checked){
        this._options.push(opts)
      }
    }
    
    this.modalActive.close({ raw: 'callback', data: { options_pick: this._options } })
  }

}
