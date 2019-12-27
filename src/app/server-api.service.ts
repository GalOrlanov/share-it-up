import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {

  constructor(private http:HttpClient) { }


 url = "http://share-it-server.herokuapp.com"
 testUrl = "http://localhost:3000"


interactWithServer(requestType , obj , url,token){
  let tokenFromsession = JSON.parse(sessionStorage.getItem('userinfo'));
  let serverRequest:any;
  let headers = new HttpHeaders({
     'Content-Type' :  'application/json',
     'Accept': 'application/json',
     //'X-Requested-With': 'XMLHttpRequest',

});
if(token){
  headers['Authorization'] =  'Token' +" "+ tokenFromsession.token;
}

  switch(requestType){
   case "POST" : 
     serverRequest = this.http.request("post",url,{body:obj , headers:headers})
     break;
   case "DELETE":
     serverRequest = this.http.request("delete",url,{body:obj , headers:headers})
     break;
   case "PUT":
     serverRequest = this.http.request("put",url,{body:obj , headers:headers})
       break;
   case "GET" :
      serverRequest = this.http.request("get",url, {headers:headers})
       break;
  }
const promise = new Promise((resolve, reject) => {
  return serverRequest.toPromise().then(
    res => {resolve(res)},
    msg =>{reject({"Error": msg})}
  )});
 return promise;
 }

 /**
  ************* cloudinary *************
  */

deleteImage(obj){
  console.log(obj);
let url = `${this.url}/items/deleteimage`
return this.interactWithServer('DELETE' ,obj , url,true)
}

/**
 *************** users ***************
 */


login(obj){
  let url = `${this.url}/api/users/login`
 return this.interactWithServer('POST',obj,url,false)
}


resetPassword(email){
  let url = `http://share-it-server.herokuapp.com/api/users/changepassword/${email}`
  return this.interactWithServer("GET" ,null, url,false);
}


}


