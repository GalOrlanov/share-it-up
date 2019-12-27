import { Component, OnInit , OnChanges, OnDestroy,Renderer2} from '@angular/core';
import{RegisterService} from '../register.service';
import { DataServiceService } from '../data-service.service'
import { UsersService } from '../users.service';
import { GroupService } from '../group.service';
import { SocketService } from '../socket.service';
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
    private socketSerive:SocketService) { }

   groupMembers:any = [];
   groupImage:any;
   groupName:any;
  showHideDeleteBtn=false;
   AddItem=false;
   isHover=false;

   menuOpen=true;
   isAdmin=false;
   classForMenu="fa fa-chevron-up";
   monthsHeaders = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   shortcutMonthsHeaders = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  newDateHeader= false;
   day= 0;
   arr= []
  


   openAddItem(){
     this.dataService.hideOrShowAddItem = !this.dataService.hideOrShowAddItem;
   }

   openMenu(memberEmail,enterOrLeave){
    this.groupMembers.map((member)=>{
       
      if(member.email === memberEmail){
        console.log(memberEmail)
        console.log(member.email);
       this.menuOpen=true;  
       return true;
      }
     })
     this.menuOpen=false;
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

   check(memberEmail){
    this.dataService.groupMembers.map((member)=>{
      if(member.email === memberEmail){
        return true;
   }
  })
return false;
}
   closeMenu(groupId,email){
    this.menuOpen=false;
    this.groupService.deleteMemberFromGroup(groupId,email).then(()=>{
      this.socketSerive.sendserver(email,this.registerService.userInfo.email,this.registerService.userInfo.pic,this.registerService.userInfo.firstname +' '+this.registerService.userInfo.lastname,false,'deleteFromGroup')
      this.groupService.getGroupMembers(groupId);
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

  ngOnInit() {
    this.groupService.getGroupMembers(this.dataService.groupId).then(()=>{
      this.dataService.groupMembers.map((member)=>{
        member.class='fa fa-chevron-up';})
     this.findMeInMembers();
    })
   }
    
   ngOnDestroy(){
     this.dataService.hideOrShowGroups = false;
   }  

}
