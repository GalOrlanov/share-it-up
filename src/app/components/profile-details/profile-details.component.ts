import { Component, OnInit, Input } from '@angular/core';
import { RegisterService } from '../../register.service'

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  
  constructor(public registerService:RegisterService) {
  
}
@Input() test:string;
  ngOnInit() {
    console.log(this.test);
    
  }

}
