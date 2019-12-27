import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {SocketService} from '../../socket.service';
import { Subscription } from 'rxjs';
import { RegisterService } from '../../register.service'
import { disableDebugTools } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component'
import {DataServiceService} from '../../data-service.service'




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  friendrequest;
  showAddByEmail=false;
  stockQuote: any;
  sub: Subscription;
  searchStr:string = '';
  showNotification=false;
  datatopass= '';

  //subscribe
  emailSelected= false;
  smsSelected= false;
  

  constructor(private socketService:SocketService,
    public registerService:RegisterService,
    private route: ActivatedRoute ,
    private notificationComponent: NotificationComponent,
    public dataService:DataServiceService,
    private router:Router ) { 

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



  ngOnInit() {
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
