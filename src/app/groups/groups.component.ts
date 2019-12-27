import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../register.service';
import {DataServiceService} from '../data-service.service'
import { UsersService } from '../users.service';
import { BillsService } from '../bills.service';
import { GroupService } from '../group.service';
import { ServerApiService } from '../server-api.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  wiggle='';
  deleteGroup=false;
  constructor(public registerService:RegisterService ,
     public dataService:DataServiceService,
     public userService: UsersService,
     private billsService: BillsService,
     private groupService:GroupService,
     public serverApi:ServerApiService) { }
     
     groupName= '';
     groupImage= '';


 openCurrentGroup(group){
   
   console.log(group);
  this.dataService.groupName =group.details.groupName;
  this.dataService.groupImage = group.details.groupImage;
  this.dataService.groupId=group.details.groupId;
  this.groupService.getGroupMembers(group.details.groupId);
  this.userService.getItemList(this.dataService.groupId);

 if(this.deleteGroup){
  this.groupService.deleteGroup(this.dataService.groupId).then((res) =>{
this.registerService.userInfo.groups = res;
console.log(res);
this.groupService.getGroupsDetails(res);
  });
  this.deleteGroup=false;
}
else{
  if(!this.dataService.groupId){
    return;
   }
  this.dataService.hideOrShowGroups=!this.dataService.hideOrShowGroups;
}

 }

 openDeleteGroup(){
   this.wiggle === '' ? this.wiggle = 'wiggle' : this.wiggle= '';
   this.deleteGroup=true;
   this.serverApi.interactWithServer("DELETE" , {
    "imageId": "1234"
  } , 'http://share-it-server.herokuapp.com/items/deleteimage',true)
 }
  openAddGroup(){
    this.dataService.showAddGroup=!this.dataService.showAddGroup;
  }
  ngOnInit() {
    if(this.dataService.groupList.length > 0)
    this.openCurrentGroup(this.dataService.groupList[0][0])
  }

}
