import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { RegisterService } from 'src/app/register.service';
import { UsersService } from 'src/app/users.service';
import { DataServiceService } from 'src/app/data-service.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FriendsComponent implements OnInit {
  showHideDeleteBtn= false;
  showAddFriend=false;
  constructor(public registerService: RegisterService,public userService:UsersService,public dataService:DataServiceService, private socketService:SocketService) { }

  ngOnInit() {
  }


  selectedFriend(selectedFriend){
    if(!selectedFriend){
      this.registerService.userInfo.friends.map((friend)=>{
        friend.selected=false;
      })
    }

    this.registerService.userInfo.friends.map((friend)=>{
      if(friend.email === selectedFriend.email){
        friend.selected=true;
      }
      else{
        friend.selected=false;
      }
      })
  }
  deleteFriend(friendEmail){
    let saveFriendsArr = this.registerService.userInfo.friends;
    console.log(saveFriendsArr);
    saveFriendsArr.map((friend,index)=>{
      if(friend.email === friendEmail){
        console.log()
        saveFriendsArr.splice(index,1);
      }
    })
    console.log(saveFriendsArr);
    let obj = {friends : saveFriendsArr}
   this.registerService.changeUser( obj,"friends").then((res)=>{
     console.log(res);
     this.registerService.getMyFriends();
     this.socketService.sendserver(friendEmail,this.registerService.userInfo.email,this.registerService.userInfo.pic,this.registerService.userInfo.firstname +" "+ this.registerService.userInfo.lastname,true,false)
   })
 
  }



 

}


