import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import {DatePipe} from '@angular/common'
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  constructor(private http:HttpClient,private socketService: SocketService) { }
url = "http://share-it-server.herokuapp.com"

  addItemToBills(itemPrice,splitMembersArray,groupId){
    splitMembersArray = splitMembersArray.members;
   
    let obj={
      itemPrice,
      splitMembersArray: splitMembersArray,
      groupId
    }
    let tokenFromSession = JSON.parse(sessionStorage.getItem('userinfo'));
  
    let headers = new HttpHeaders({
      'Content-Type' :  'application/json',
    'Authorization' : 'Token' + " " + tokenFromSession.token
  });

   const promise =
    new Promise((resolve, reject) => {
      return this.http.post<any>(this.url + '/items/split',obj,{headers:headers}).toPromise().then(
        res => { 
        resolve(res);
        }, 
        msg =>{
        reject("Error");
        }
      )
    })
    return promise;
  }


getBills(id){
  let tokenFromSession = JSON.parse(sessionStorage.getItem('userinfo'));
  let headers = new HttpHeaders({
    'Content-Type' :  'application/json',
  'Authorization' : 'Token' + " " + tokenFromSession.token
});

  const promise = 
  new Promise((resolve,reject) =>{
    return this.http.get<any>(this.url + '/items/bills/' + id,{headers}).toPromise()
    .then((res)=>{
     resolve(res);
    },
    msg=>{
      reject("error " + msg);
    }
    
    )
  })
  return promise;
}
  
  }

