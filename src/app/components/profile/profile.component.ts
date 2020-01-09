import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {SocketService} from '../../socket.service';
import { Subscription } from 'rxjs';
import { RegisterService } from '../../register.service'
import { disableDebugTools } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component'
import {DataServiceService} from '../../data-service.service'
import { GroupService } from 'src/app/group.service';
import { UsersService } from 'src/app/users.service';
import { ServerApiService } from 'src/app/server-api.service';
import { StatsService } from 'src/app/stats.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  friendrequest;
  showAddByEmail=false;
  stockQuote: any;
  sub: Subscription;
  searchStr:string = '';
  showNotification=false;
  datatopass= '';
  groupsArray= [];
  //subscribe
  emailSelected= false;
  settleArray= [];
  smsSelected= false;
  

  constructor(private socketService:SocketService,
    public registerService:RegisterService,
    private route: ActivatedRoute ,
    private notificationComponent: NotificationComponent,
    public dataService:DataServiceService,
    private router:Router,
    private groupService: GroupService,
    private userServie:UsersService ,
    private serverApi: ServerApiService,
    private statsService:StatsService) { 

  }
   
  changeshowAddByEmail(){
    this.showAddByEmail=!this.showAddByEmail;
  }
  
  
updateUserInfo(){

}


setImageSelected(value){
if(value === 'sms'){
  this.smsSelected = !this.smsSelected;
}
if(value === 'email' ){
  this.emailSelected = !this.emailSelected;
}
}

getDataForSettleUp(){
  this.registerService.userInfo.groups((group)=>{
   this.userServie.getItemList(group)
  })
}

getTotalOwe(isMyOwe){
  let returnValue =0;
  console.log(this.settleArray)
  this.settleArray.map((owe) => {
    
    isMyOwe ? 
    returnValue += owe.oweMe 
    :
    returnValue += owe.youOwe
  })
console.log(returnValue)
  return returnValue.toFixed(0);
}

  ngOnInit() {
    this.groupService.getGroupsDetails(this.registerService.userInfo.groups)
    .then((res:any)=> { 
      this.groupsArray = res  
    console.log(this.groupsArray) } )

    let obj = {groupArray: this.registerService.userInfo.groups}
    this.serverApi.getAllItems(obj).then( (res:any)=>
    {
      this.settleArray =  this.statsService.dataForTable(res.groupArray);
    console.log(this.settleArray)
    this.getTotalOwe(false);
    })

    

    if(!this.registerService.userInfo){
    this.registerService.updateUserInfo(null).then(()=>{
      if(!this.registerService.userInfo){
        this.router.navigateByUrl('/login')
      }
    })
  }
    
    
   //this.registerService.addToActivityLog("asdasdasdasdasdasdasd");
   this.socketService.connectToSocket(this.registerService.userInfo.email);
   this.dataService.groupId= this.registerService.userInfo.groups[0] ? this.registerService.userInfo.groups[0] : null;
   this.dataService.showOrHideSpinner = false;
   
  }


}
