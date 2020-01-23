import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { RegisterService } from 'src/app/register.service';
import { UsersService } from 'src/app/users.service';
import { DataServiceService } from 'src/app/data-service.service';
import { SocketService } from 'src/app/socket.service';
import { ServerApiService } from 'src/app/server-api.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FriendsComponent implements OnInit {
  showHideDeleteBtn= false;
  showAddFriend=false;
  constructor(public registerService: RegisterService,
    public userService:UsersService,
    public dataService:DataServiceService,
     private socketService:SocketService,
     private serverApi:ServerApiService) { }

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
  let obj = {friendEmail , userEmail : this.registerService.userInfo.email}
   this.serverApi.deleteFriend(obj).then((res)=>{
console.log(res);
   })
  }



 

}


