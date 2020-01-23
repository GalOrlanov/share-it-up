import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UsersService } from '../users.service';
import { DataServiceService } from '../data-service.service';
import { RegisterService } from '../register.service';
import { BillsService } from '../bills.service';
import { CloudinaryService } from 'src/app/cloudinary.service';
import currency from '../../assets/jsons/currency.json'
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary'

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(public userService:UsersService,
    public dataService:DataServiceService,
    public registerService: RegisterService,
   public cloudinaryService:CloudinaryService) { }
ddd='';
cur='';
    showSplit='false';
  addDate = new Date().toISOString().split('T')[0];
  currencyArray = currency;
  itemPrice=0;
  itemImage='';
  serializedDate = new FormControl((new Date()).toISOString());
  showImgList=false;
  selectedImg=null;
  todayDate=new Date();

 images = [{
   item : 'milk',
   url : '../../assets/images/milk.jpg'
 },{
 item : 'water',
 url : '../../assets/images/meiAvivim.jpg'
 },{
  item : 'electricity',
  url : '../../assets/images/elect.jpg'
  },{
    item : 'eggs',
    url : '../../assets/images/Eggs-Plate.jpg'
    }
]
uploader: CloudinaryUploader = new CloudinaryUploader(
  new CloudinaryOptions({
    cloudName: 'dendjmf47',
    uploadPreset: 'ml_default'
  })
)

onImageClick(url){
this.dataService.itemImage=url;
this.showAndHideImgList();
}

upload(evt){
  this.cloudinaryService.upload(evt,'item')
}


showAndHideImgList(){
  this.showImgList=!this.showImgList;
}

getCurrency(){
return currency;
}
closeSplit(){
this.showSplit='false';
}

splitOrganize(){

let members= []
let splitPrice = this.itemPrice / this.dataService.splitArray.length;
this.dataService.splitArray.map((member)=>{
  let totalOwe = member[1] > splitPrice ? member[1] - splitPrice : 0; 
 members.push({name: member[4] ,groupMembers: this.dataService.groupMembers, email: member[0] , pay: member[1], totalOwe: totalOwe, totalPay: member[1] , oweMe: [], oweTo: []});
})


for(let i =0 ; i< members.length ; i++){
if(members[i].pay > splitPrice){
 for(let j=0;j<members.length; j++){
   //if(members[j] !== members[i]) break;
   if(members[j].pay< splitPrice){
     if(members[i].totalOwe- (splitPrice - members[j].pay)>=0){
     members[i].totalOwe-= splitPrice - members[j].pay;
     members[i].oweMe.push({
       name : members[j].name,
       email : members[j].email,
       owe: splitPrice - members[j].pay
     })
     members[j].oweTo.push({
      name : members[i].name,
      email : members[i].email,
      owe: splitPrice - members[j].pay
    })
members[j].pay = splitPrice - members[j].pay;
     }
     else{
       members[i].oweMe.push({
          name : members[j].name,
          email : members[j].email,
          owe: members[i].totalOwe 
        })


        members[j].oweTo.push({
          name : members[i].name,
          email : members[i].email,
          owe: members[i].totalOwe 
        })
        members[j].pay = (splitPrice-members[j].pay)-members[i].totalOwe;
        members[i].totalOwe = 0;
      
     }
   }
 }
}

}
this.dataService.splitOrginize = members;
return members;

}


SubmitForm(itemForm){
localStorage.setItem('currency' , this.cur);
var item = itemForm;
item.price = this.itemPrice;
item.date = this.addDate;
item.pic= this.dataService.itemImage ? this.dataService.itemImage : '../../assets/images/itemTag.png' 
item.group= this.dataService.groupId;
item.split = this.splitOrganize();
item.currency = this.cur.split(' - ')[0];
item.buyerEmail=this.registerService.userInfo.email;
item.buyerName = this.registerService.userInfo.firstname + " " + this.registerService.userInfo.lastname
this.userService.addItem(item);
this.dataService.hideOrShowAddItem=! this.dataService.hideOrShowAddItem;
this.dataService.itemImage = '';

}
  ngOnInit() {
  this.cur = localStorage.getItem('currency');
 
  }

}
