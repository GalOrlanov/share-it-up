import { Injectable } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { RegisterService } from './register.service';
import { UsersService } from './users.service';
import { ServerApiService } from './server-api.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private serverApi:ServerApiService,private dataService: DataServiceService, private registerService:RegisterService, private userService:UsersService) { }
/**
 * 
 * @param itemsArray 
 * @returns array with all friends owes
 */
  dataForTable(itemsArray){
    console.log(itemsArray)
    let memberArr = [];
    this.registerService.userInfo.friends.map((groupMember)=>{
     memberArr.push({name: groupMember.firstname +" " + groupMember.lastname , email: groupMember.email , oweMe: 0 , youOwe: 0 });
    })
   itemsArray.map((item)=>{
     item.split.map((splitArray)=>{
     if(splitArray.email === this.registerService.userInfo.email){
         memberArr.map((member)=>{
           splitArray.oweMe.map((owe)=>{
           if(member.email === owe.email){
             member.oweMe += owe.owe === undefined ? 0 : owe.owe
           }
         })
         splitArray.oweTo.map((owe)=>{
           if(member.email === owe.email){
             member.youOwe += owe.owe === undefined ? 0 : owe.owe
           }
         })
       })
     }
     })
   })
 console.log(memberArr)
   return memberArr;
  }

  /**
   * get the image of friend with his email
   * @param email 
   * @returns user Image
   */
  getImageWithEmail(email){
    let user = this.registerService.userInfo.friends.find(friend => friend.email===email);
    return user.pic;
  }
 

  getMyOwes(groupId){
    let group =[];
    if(groupId==='all'){
      this.serverApi.getAllItems(this.registerService.userInfo.groups)
      .then((res:any)=> group=res.groupArray)
     group = this.dataForTable(group)
    }
    else{
       this.userService.getItemList(groupId);
       group = this.userService.users;
       this.dataForTable(group);
    }

  }

}
