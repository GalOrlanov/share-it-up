import { Component, OnInit , OnChanges, OnDestroy,Renderer2} from '@angular/core';
import{RegisterService} from '../register.service';
import { DataServiceService } from '../data-service.service'
import { UsersService } from '../users.service';
import { GroupService } from '../group.service';
import { SocketService } from '../socket.service';
import { StatsService } from '../stats.service';
import { ServerApiService } from '../server-api.service';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  
  constructor(public registerService: RegisterService ,
    public dataService:DataServiceService,
    public userService: UsersService,
    private renderer:Renderer2,
    private groupService: GroupService,
    private socketSerive:SocketService,
    private statsService:StatsService,
    private serverApi:ServerApiService) {
      this.serverApi.getItems(this.dataService.groupId).then(res=> console.log(res))
     }





   groupItems:any = [];
   groupMembers:any = [];
   groupDetails:any = {groupImage:'' , groupName: '' , groupId:''};
   showHideDeleteBtn=false;
   AddItem=false;
   isHover=false;
   selectedFriend= 2;
   menuOpen=true;
   isAdmin=false;
   monthsHeaders = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   shortcutMonthsHeaders = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
 
  
changeGroup(group){
  if(!group || group === {}) return;
  let groupId = group.details.groupId;

this.groupDetails = group.details;

console.log(this.groupDetails)
this.getItems(groupId);
this.getGroupMembers(groupId);
}

getItems(groupId){
this.serverApi.getItems(groupId)
.then(res =>{
  
  this.groupItems = res
  this.getGroupOwes()
})
}

getGroupMembers(groupId){
this.serverApi.getGroupMembers(groupId)
.then(res=> this.groupMembers = res)
}

getGroupOwes(){
  console.log(this.statsService.dataForTable(this.groupItems))
}

   openAddItem(){
     this.dataService.hideOrShowAddItem = !this.dataService.hideOrShowAddItem;
   }


   findMeInMembers(){
     let admin=false;
    this.dataService.groupMembers.map((member)=>{
      if(member.email === this.registerService.userInfo.email && member.admin === true ){
        admin=true;
      }
    })
    this.isAdmin=admin;
   }




   closeMenu(groupId,email){
    this.menuOpen=false;
    this.groupService.deleteMemberFromGroup(groupId,email).then(()=>{
      this.socketSerive.sendserver(email,this.registerService.userInfo.email,this.registerService.userInfo.pic,this.registerService.userInfo.firstname +' '+this.registerService.userInfo.lastname,false,'deleteFromGroup')
      this.serverApi.getGroupMembers(groupId);
    })
   }
    deleteItem(item){
      this.isHover = item;
    }
   
    dateForTitle(date){
      return this.monthsHeaders[parseInt(date.substring(5,7))-1] +" "+ date.substring(0,4);
    }
    dateForItem(date){
      return date.substring(8,10) + " " + this.shortcutMonthsHeaders[parseInt(date.substring(5,7))-1];
    }

    getAdminForButton(admin){
      if(admin){
        return 'Remove Admin';
      }
      else{
        return 'Make Admin';
      }
    }
openFriendMenu(index){
this.selectedFriend = index;
setTimeout(
 ()=> this.selectedFriend =-1 ,  5000)

}

checkIfMenu(index){
return (this.selectedFriend === index)
}




  ngOnInit() {
   
  }
}
