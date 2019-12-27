import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor(public dataService: DataServiceService) { }
   color = 'blue'
  ngOnInit() {
  }

}
