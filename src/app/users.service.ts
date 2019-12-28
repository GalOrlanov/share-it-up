import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { RegisterService } from './register.service';
import { DataServiceService } from './data-service.service';
import { BillsService } from './bills.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
url:string = 'https://share-it-server.herokuapp.com';
name:any='';
users:Array<any>=[];
totalForGroup:any=0;
oweMe:number= 0;
myOwen:number=0;



  constructor(private http:HttpClient,public registerService:RegisterService,public dataService:DataServiceService,private billsService:BillsService) { }

getItemList(groupId){
  
  this.totalForGroup=0;
  this.oweMe=0;
  this.dataService.showOrHideSpinner=true;
  let tokenFromSession = JSON.parse(sessionStorage.getItem('userinfo'));
  let headers = new HttpHeaders({
    'Content-Type' :  'application/json',
  'Authorization' : 'Token' +" "+ tokenFromSession.token
});
  return this.http.get<any>(this.url + "/items/" + groupId,{ headers : headers})
  .subscribe(data => {
    let current = 13;
     data.map((item)=>{
      
      if(!item.memberSchema){
        if(item.buyerEmail === this.registerService.userInfo.email){
          item.split.map((member)=>{
            if(member[0] === this.registerService.userInfo.email){
              this.oweMe+=member[1] 
            }
          })
        }
       
        this.totalForGroup+=item.price;
    if(parseInt(item.date.substring(5,7)) < current ) {
      current=parseInt(item.date.substring(5,7));
      item.newDate= true;
     }
    }
    })
    this.users=data;
    this.users.map((item,index)=>{
      if(item.memberSchema){
       
        this.users.splice(index,1);
      }
    })

    
    this.dataService.showOrHideSpinner=false;
});
  
}

addItem(obj):any{
  let tokenFromSession = JSON.parse(sessionStorage.getItem('userinfo'));
  let headers = new HttpHeaders({
    'Content-Type' :  'application/json',
  'Authorization' : 'Token' + " " + tokenFromSession.token
});
  this.http.post( this.url + '/items' ,obj,
  {headers : headers } )
  .subscribe((res : any[])=>{
  this.getItemList(obj.group);
  });
}

deleteItem(group,id){
  let tokenFromSession = JSON.parse(sessionStorage.getItem('userinfo'));
  
  let headers = new HttpHeaders({
    'Content-Type' :  'application/json',
  'Authorization' : 'Token' + " " + tokenFromSession.token
});
  this.http.delete( this.url + '/items/' + group +"/"+ id,
  {headers : headers } )
  .subscribe((res : any[])=>{
  this.getItemList(group);
  });


}


}


