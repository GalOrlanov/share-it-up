import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { SocketService } from '../socket.service';
import { ServerApiService } from '../server-api.service';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.css']
})
export class AddFriendsComponent implements OnInit {
  showAddByEmail=false;
  friendrequest:any ='';
  constructor(public registerService:RegisterService,private socketService: SocketService,private serverApi:ServerApiService) { }


  sendFriendRequest(friendEmail){
 let obj = {friendEmail , userEmail : this.registerService.userInfo.email}
  this.serverApi.sendFriendRequest(obj).then((res)=>{
console.log(res);
  })
}


  ngOnInit() {
  }

}
