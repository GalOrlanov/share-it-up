import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {
  total= '250$'
  splitArray=['gal: 150$', 'natali: 100$']
  constructor() { }


  ngOnInit() {
  }

}
