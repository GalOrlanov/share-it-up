import { Component, OnInit, Input , ViewEncapsulation} from '@angular/core';
import { Options } from 'ng5-slider';
import { map } from 'rxjs/operators';
import { DataServiceService } from '../data-service.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.css']
})



export class SplitComponent implements OnInit {
  @Input() itemPrice:number;
  @Input() groupMembers:any;

  constructor(public dataService:DataServiceService) { }

  memberLength = 3;
  value: number = 100;
  passedAmount=false;
  check=0
  notReached=true;
  array=["page 1- kjnasdasdmnasdkmjsdfkjmsjkdfsm,dfj sdjfsdm,fjsdkfksdfjxkfjkxjf" , "page 2 - jmhsdfmshbndfmnsdf" , "page 3-sdfsdfsdfsdf"  ,"page 4-sdfsdfsdfsdf" , "page 5-asdasdasdasdasd"];
  totalPrice =this.itemPrice
  totalleft=this.itemPrice
  membersArray= [];


  options: Options = {
    floor: 0,
    ceil: this.array.length,
  };
  


  ngOnInit() {
    this.totalPrice =this.itemPrice;
    this.totalleft=this.itemPrice;
    console.log(this.itemPrice)
    this.groupMembers.map((member)=>{
      this.membersArray.push([member.email, 0 , { maxLimit: this.totalleft , ceil: this.totalPrice} ,this.totalPrice,member.firstname+' '+member.lastname , member.pic])
    })
    console.log(this.membersArray)
  }
  
  
 
asd(price,index){
  let total = 0;
  this.membersArray.map((member)=>{
    total += parseInt(member[1].toString())
  })
  console.log(price);
  this.totalleft = this.totalPrice - total;
  if(total > this.totalPrice){
    this.passedAmount=true;
  }
  else{
    this.passedAmount=false;
  }
  if(total  <  this.totalPrice){
    this.notReached = true;
  }
  else{
    this.notReached = false;
  }
  this.dataService.splitPrice = this.totalPrice / this.membersArray.length;
  this.dataService.splitArray=this.membersArray;
}

}
