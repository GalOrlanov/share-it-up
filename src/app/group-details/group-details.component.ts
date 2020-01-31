import { Component, OnInit, Input } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {

  constructor(public dataService:DataServiceService) { }
@Input() totalMembers:any;
@Input() youOwe:any;
@Input() oweMe:any;

  

  ngOnInit() {
  }

}
