import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { RegisterService } from './register.service';
import { DataServiceService } from './data-service.service';
import { BillsService } from './bills.service';
import { promise } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
//url:string = 'https://share-it-server.herokuapp.com';
url = 'http://192.168.1.9:3000'
name:any='';
users:Array<any>=[];
allItems=[]
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
    this.users=data;
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


