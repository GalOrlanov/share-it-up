import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { DataServiceService } from './data-service.service';
import { RegisterService } from './register.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor( private http:HttpClient, public dataService: DataServiceService,private socketService:SocketService) { }


  getGroupsDetails(groupsArray){
   // let groupsArray = this.registerService.userInfo.groups;
   console.log(groupsArray);
    let tokenFromsession = JSON.parse(sessionStorage.getItem('userinfo'));
  
    let headers = new HttpHeaders({
      'Content-Type' :  'application/json',
      'Accept': 'application/json',
    'Authorization' : 'Token' +" "+ tokenFromsession.token
  });
  
  const promise =
  new Promise((resolve, reject) => {
    return this.http.post<any>('http://share-it-server.herokuapp.com/api/users/group/details',{ groupsArray } ,  {headers:headers}).toPromise().then(
      res => {
        this.dataService.groupList = res;
        console.log(this.dataService.groupList);
      resolve(res);
      },
      msg =>{
      reject("Error");
      }
    )
    });
   return promise;
        }


  getGroupMembers(groupId){
    console.log(groupId);
    if(!groupId){
      return;
    }
    let tokenFromsession = JSON.parse(sessionStorage.getItem('userinfo'));
  
    let headers = new HttpHeaders({
      'Content-Type' :  'application/json',
      'Accept': 'application/json',
    'Authorization' : 'Token' +" "+ tokenFromsession.token
  });
  
  const promise =
  new Promise((resolve, reject) => {
    return this.http.get<any>('http://share-it-server.herokuapp.com/api/users/group/members/' + groupId ,  {headers:headers}).toPromise().then(
      res => {
        console.log(res)
    this.dataService.groupMembers = res;
      resolve(res);
      },
      msg =>{
      reject("Error");
      }
    )
    });
    return promise;
        }

        setGroupDetails(groupId,groupName,groupImage){
          let obj={
            groupId,
            details: {
              groupName,
              groupImage,
             
            }
          }
          let tokenFromsession = JSON.parse(sessionStorage.getItem('userinfo'));
        
          let headers = new HttpHeaders({
            'Content-Type' :  'application/json',
            'Accept': 'application/json',
          'Authorization' : 'Token' +" "+ tokenFromsession.token
        });
        
        const promise =
        new Promise((resolve, reject) => {
          return this.http.post<any>('http://share-it-server.herokuapp.com/api/users/group/detailsupdate/' , obj,  {headers:headers}).toPromise().then(
            res => {
              console.log(res);
            resolve(res);
            },
            msg =>{
            reject("Error");
            }
          )
          });
         return promise;
              }
  


  addMemberToGroup(groupId , user){
    let tokenFromsession = JSON.parse(sessionStorage.getItem('userinfo'));
  
    let headers = new HttpHeaders({
      'Content-Type' :  'application/json',
      'Accept': 'application/json',
    'Authorization' : 'Token' +" "+ tokenFromsession.token
  });
  
  //headers.append('access-control-allow-methods' , 'PUT');
  let obj = {user :{} , groupId: ''};
  obj.user = user;
  obj.groupId = groupId;

  const promise =
  new Promise((resolve, reject) => {
    return this.http.post<any>('http://share-it-server.herokuapp.com/api/users/group/addmember',obj, {headers:headers}).toPromise().then(
      res => {
        console.log(res);
      resolve(res);
      },
      msg =>{
      reject("Error");
      }
    )
    });
   return promise;
        }

        deleteMemberFromGroup(groupId , userEmail){
          let tokenFromsession = JSON.parse(sessionStorage.getItem('userinfo'));
        
          let headers = new HttpHeaders({
            'Content-Type' :  'application/json',
            'Accept': 'application/json',
          'Authorization' : 'Token' +" "+ tokenFromsession.token
        });

        const promise =
        new Promise((resolve, reject) => {
          return this.http.post<any>('http://share-it-server.herokuapp.com/api/users/group/deletemember/',{groupId,userEmail}, {headers:headers}).toPromise().then(
            res => {
              console.log(res);
            resolve(res);
            },
            msg =>{
            reject("Error");
            }
          )
          });
         return promise;
              }      




              deleteGroup(groupId){
                console.log("delete Group - " + groupId)
                let tokenFromsession = JSON.parse(sessionStorage.getItem('userinfo'));
                let headers = new HttpHeaders({
                  'Content-Type' :  'application/json',
                  'Accept': 'application/json',
                'Authorization' : 'Token' +" "+ tokenFromsession.token
              });
      
              const promise =
              new Promise((resolve, reject) => {
                return this.http.delete<any>('http://share-it-server.herokuapp.com/api/users/group/delete/'+ groupId , {headers:headers}).toPromise().then(
                  res => {
                   
                  resolve(res);
                  },
                  msg =>{
                  reject("Error");
                  }
                )
                });
               return promise;
                    }      


}
