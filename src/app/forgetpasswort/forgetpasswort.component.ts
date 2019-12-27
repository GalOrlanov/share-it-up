import { Component, OnInit,Input } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { ServerApiService } from '../server-api.service';

@Component({
  selector: 'app-forgetpasswort',
  templateUrl: './forgetpasswort.component.html',
  styleUrls: ['./forgetpasswort.component.css']
})
export class ForgetpasswortComponent implements OnInit {


  constructor(public dataService:DataServiceService, public serverApi:ServerApiService) { }
email=''
  ngOnInit() {
  }

}
