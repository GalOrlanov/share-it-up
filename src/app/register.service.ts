import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import {DatePipe} from '@angular/common'
import { SocketService } from './socket.service';
import { AuthService } from './auth.service';
import { GroupService } from './group.service';




@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  socket:any;
  constructor(private groupService:GroupService, private http:HttpClient,private socketService: SocketService, private authService: AuthService) { }
url ="https://share-it-server.herokuapp.com/api/users"
userInfo:any = '';
userToken:String = '';
friendrequest:any = {};

add(obj:any)
  {
    
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.url,obj,{headers:headers}).subscribe((res) => {
     console.log(res);
    })

    
   
  }

  addToActivityLog(activity){
    
  let arr= this.userInfo.activity;
  let pipe = new DatePipe('en-US');
  const now = Date.now();
  const myFormattedDate = pipe.transform(now, 'MM/dd/yy, HH:mm a');
  arr.push(myFormattedDate + activity)
  let obj={
    "activity" : arr
  }
  //this.changeUser(obj,"activity");
  }

changeOtherUser(email , groupId){
  console.log(email);
  let tokenFromsession = JSON.parse(sessionStorage.getItem('userinfo'));
   let obj ;
   this.userInfo.groups.map((group)=>{
    if(groupId === group.id){
      obj = group;
    }
   })
  
     let headers = new HttpHeaders({
    'Content-Type' :  'application/json',
    'Accept': 'application/json',
  'Authorization' : 'Token' +" "+ tokenFromsession.token
});
headers.append('access-control-allow-methods' , 'PUT');
const promise =
new Promise((resolve, reject) => {
  return this.http.put<any>(this.url + '/other/' + email ,obj,{headers:headers}).toPromise().then(
    res => {
    this.userInfo=res;
    this.socketService.sendserver(email,this.userInfo.email,this.userInfo.pic,this.userInfo.firstname+" " + this.userInfo.lastname,false,false);
    resolve(res);
    },
    msg =>{
    reject("Error");
    }
  )
  });
 return promise;
      }


//change my user after friends request
  changeUser(obj,objType)
  {
    
    

     let headers = new HttpHeaders({
    'Content-Type' :  'application/json',
    'Accept': 'application/json',
  'Authorization' : 'Token' +" "+ this.userInfo.token
});
headers.append('access-control-allow-methods' , 'PUT');
const promise =
new Promise((resolve, reject) => {
  return this.http.put<any>(this.url + '/' + this.userInfo._id ,obj,{headers:headers}).toPromise().then(
    res => {
    //this.userInfo[objType]=res[objType];
    console.log(this.userInfo[objType]);
    this.updateUserInfo(objType);
    resolve(res);
    },
    msg =>{
    reject("Error");
    }
  )
  });
 return promise;
      }

    
       getValue = (obj, arrPath) => (
        arrPath.reduce((x, y) => {
          if (y in x) return x[y]
          return {}
        }, obj)
      )
  
  groupMembers(group){
    console.log("hey youuuuuuuuuuu " + this.getValue(this.userInfo, ['user','groups',group]));
  }
  
  existEmail(email,status:String){
   let obj={
     'email' : email,
     "firstname" : this.userInfo.firstname,
     "lastname" : this.userInfo.lastname,
     "sentemail" : this.userInfo.email,
     "pic" : this.userInfo.pic
    
   }
   obj["status"] = status =='sent' ? 'confirm' : 'true' ;
   let tokenFromsession = JSON.parse(sessionStorage.getItem('userinfo'));
   let headers = new HttpHeaders({
  'Content-Type' :  'application/json',
  'Accept': 'application/json',
  'Authorization' : 'Token' +" "+ this.userInfo.token
});

const promise =
new Promise((resolve, reject) => {
return this.http.post<any>(this.url + '/friend' ,obj,{headers:headers}).toPromise().then(
  res => {
  resolve(res);
  console.log("Respons from exist: " + JSON.stringify(res));
  //this.userInfo=res;
  this.updateUserInfo("friends")
  },
  msg => {
  reject("Error" + msg);
  }
)
});
return promise;
    }



   
   updateUserInfo(obj){
    if(this.userInfo){
      return;
    }
    const promise =
    new Promise((resolve, reject) => {
      return this.http.get<any>(this.url + '/validlogin/' ).toPromise().then(
        res => { 
          console.log(res);
          if(res === {"error" : "not"}){
            return;
          }
          else{
            if(obj===null ){
          this.userInfo = res
          this.authService.loggedIn = true;
          this.socketService.connectToSocket(this.userInfo.email);
          this.groupService.getGroupsDetails(this.userInfo.groups);
          sessionStorage.setItem('userinfo' , JSON.stringify(res));
          
            }
          else{
          this.userInfo[obj] = res[obj];
          }
          console.log('after update:')
          console.log(obj === null ? res : res[obj])
          resolve(res);
          }
        }, 
        msg =>{
        reject("Error");
        }
      )
    })
     
  return promise;
}



sendFriendRequest(email,status){
  this.existEmail(email,status).then( (res) =>{
   if(!res) {
     alert("no such user " + email)
     return;
  }
  
   this.friendrequest = res;
   
   return res;
  }).then( ( res ) => {
    if(!res) {return;}
    this.friendrequest=res;
   let arr = this.userInfo.friends;
   let obj = { 
     "firstname" : this.friendrequest.firstname,
     "lastname" : this.friendrequest.lastname,
     "email" : this.friendrequest.email,
     "emailsent" : this.friendrequest.emailsent,
     "pic" : this.friendrequest.pic,
     "status" : 'sent'
   }
   if(status == 'sent'){
     obj.status="sent";
     arr.push(obj);
   }
  
   if(status == 'true'){
     for(var i=0;i<arr.length ; i++){
       if(email == arr[i].email){
         arr[i].status='true';
      
       }
     }
   }
   else{
   //arr.push(obj);
   console.log(arr);
   }
   this.changeUser({"friends" : arr },"friends").then( (res) => {
    this.socketService.sendserver(email,this.userInfo.email,this.userInfo.pic,this.userInfo.firstname+" " + this.userInfo.lastname,false,obj.status);
    });
  

});

}


getMyFriends(){
  let headers = new HttpHeaders({
    'Content-Type' :  'application/json',
    'Accept': 'application/json',
    'Authorization' : 'Token' +" "+ this.userInfo.token
  });
  const promise =
  new Promise((resolve, reject) => {
    return this.http.get<any>(this.url + '/getmyfriends/' + this.userInfo.email,{headers: headers} ).toPromise().then(
      res => { 
        this.userInfo.friends = res;
        console.log(this.userInfo.friends)
        resolve(res);
      }, 
      msg =>{
      reject("cannot get friends!");
      }
    )
  })
   
return promise;
}




}


