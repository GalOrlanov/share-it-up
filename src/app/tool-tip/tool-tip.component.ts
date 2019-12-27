import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tool-tip',
  templateUrl: './tool-tip.component.html',
  styleUrls: ['./tool-tip.component.css']
})
export class ToolTipComponent implements OnInit {

   @Input() total:any;
   @Input() splitArray:any;
  

  constructor() { }

  ngOnInit() {
   
  }

}
