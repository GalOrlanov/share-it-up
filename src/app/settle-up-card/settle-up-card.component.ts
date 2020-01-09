import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-settle-up-card',
  templateUrl: './settle-up-card.component.html',
  styleUrls: ['./settle-up-card.component.css']
})
export class SettleUpCardComponent implements OnInit {
@Input() image:String;
@Input() name:String;
@Input() youOwe: String;
@Input() oweYou: String;
  constructor() { }

  ngOnInit() {
  }

}
