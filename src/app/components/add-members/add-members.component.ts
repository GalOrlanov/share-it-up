import { Component, OnInit, Input } from '@angular/core';
import {RegisterService} from '../../register.service'
import {DataServiceService } from '../../data-service.service'
import { GroupService } from 'src/app/group.service';
import { ServerApiService } from 'src/app/server-api.service';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {

  constructor(private groupService:GroupService,private serverApi:ServerApiService, public registerService:RegisterService , public dataService:DataServiceService) { }
  searchStr = '';
  friendsList= [];
@Input('newUser')  isNewUser:boolean;
@Input() newGroup:boolean;
@Input() groupId:string;

  asd(fr){
    this.friendsList.map((friend) => {
      if(friend===fr) return false;
    } )
    return true;
  }
  passDataToAddGroup(friend){
    //check if its a new group to add or it need to be change
    if(!this.isNewUser){
      console.log("not anew user")
    this.friendsList.push(friend)
    this.dataService.friendsList= this.friendsList;
    }
    else{
      console.log("new userrrrr")
      let arr = this.registerService.userInfo.groups;
      arr.map((group)=>{
        if(group.id === this.dataService.groupId){
                  group.members.push(friend);
        }
      })
      console.log(arr)
 
     this.groupService.addMemberToGroup(this.groupId,friend).then(()=>{
      this.serverApi.getGroupMembers(this.groupId);
      this.dataService.showAddMember=false;
     })

    }
  }

  checkIfMemberInGroup(friend){
    
    var inGroup=true;
    this.dataService.groupMembers.map((groupMember)=>{
if(friend.email === groupMember.email){
  inGroup=false;
}
    });
    return inGroup;
  }

  ngOnInit() {
  }

}
