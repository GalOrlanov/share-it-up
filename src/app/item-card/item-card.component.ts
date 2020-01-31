import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { UsersService } from '../users.service';
import { DataServiceService } from '../data-service.service';
import { RegisterService } from '../register.service';
import { ServerApiService } from '../server-api.service';


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
@Input() groupId: any;
@Output() afterDelete: EventEmitter<any> = new EventEmitter()
totalPrice="ss";
splitArray=[]

  constructor(
    public userService: UsersService,
    public dataService:DataServiceService,
    public registerService:RegisterService,
    private serverApi:ServerApiService) {
  
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

deleteItem(){
  this.serverApi.deleteItem(this.groupId,this.id).then((res)=>{
    this.afterDelete.emit(res)
  })
 
}

  hoverFunction(id){
    if(this.hover === id){
      return true;
    }
    return false;
  }

  
}
