import { Component, OnInit ,Input} from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public dataService:DataServiceService) { }

  show=true;



  @Input() img:any;
  @Input() msg:any;

  ngOnInit() {
 
  }

}
