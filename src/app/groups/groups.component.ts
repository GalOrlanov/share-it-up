import { Component, OnInit, Input ,Output, EventEmitter } from '@angular/core';
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
@Output() groupListener: EventEmitter<Object> = new EventEmitter();
  wiggle='';
  deleteGroup=false;
  groupsList:any = [];

  constructor(public registerService:RegisterService ,
     public dataService:DataServiceService,
     public userService: UsersService,
     private groupService:GroupService,
     public serverApi:ServerApiService) { }
     


 openCurrentGroup(group){
   this.groupListener.emit(group)

 if(this.deleteGroup){
  this.groupService.deleteGroup(this.dataService.groupId).then((res) =>{
this.registerService.userInfo.groups = res;
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
  } , 'https://share-it-server.herokuapp.com/items/deleteimage',true)
 }
  openAddGroup(){
    this.dataService.showAddGroup=!this.dataService.showAddGroup;
  }
  ngOnInit() {
    if(this.dataService.groupList.length > 0){
    //this.openCurrentGroup(this.dataService.groupList[0][0])
    }
    this.serverApi.getGroupsDetails(this.registerService.userInfo.groups)
    .then(res => this.groupsList=res)
  }

}
