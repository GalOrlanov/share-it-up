import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { DataServiceService } from '../data-service.service';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
@Input() date:any;
@Input() itemName:any;
@Input() paidBy:any;
@Input() price:any;
@Input() itemId:any;
@Input() image:any;
@Input() hover:any;
@Input() id:any;
@Input() currency:any;
@Input() split:any;

totalPrice="ss";
splitArray=[]

  constructor(public userService: UsersService,public dataService:DataServiceService,public registerService:RegisterService) {
  
   }

  ngOnInit() {
    this.totalPrice=this.price + this.currency
    this.calculateOwes();
   
  }

calculateOwes(){
 this.split.map((member)=>{
   this.splitArray.push(`${member.name}-   ${member.totalPay}${this.currency}`)
 })

}



  hoverFunction(id){
    if(this.hover === id){
      return true;
    }
    return false;
  }

  showTooltip(){
    
  }
  
}
