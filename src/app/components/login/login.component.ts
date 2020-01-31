import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { RegisterService} from '../../register.service';
import { UsersService } from '../../users.service';
import { SocketService } from '../../socket.service'
import { DataServiceService } from 'src/app/data-service.service';
import { AuthService } from 'src/app/auth.service';
import { GroupService } from 'src/app/group.service';
import { ServerApiService } from 'src/app/server-api.service';
import { Alert } from 'selenium-webdriver';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public registerService:RegisterService,
    private socketService:SocketService,
     private router:Router,
     private usersService:UsersService,
     public dataService:DataServiceService,
     private authService:AuthService,
     private groupService:GroupService,
     public serverApi:ServerApiService,
     
     ) { }

      container = 'container'
      wrongLoginDetails=false;
      openForgetPassword=false;
      

      firstName =''
      lastName=''
      userEmail='galorlanov@gmail.com'
      userPassword='111'
      confirmPass=''
      userPhone=''
      userAdress=''
      userImg=null

  SubmitForm(form:any){
 
   var obj = {
    "user": {
      "email" : form.email,
      "password" : form.password
    }
  }
   this.serverApi.login(obj).then( (res:any ) => {
     
    this.registerService.userInfo = res;
    this.socketService.connectToSocket(res.email);
    sessionStorage.setItem('userinfo' , JSON.stringify(res));
    console.log(res)
    this.authService.loggedIn =true;
    this.router.navigateByUrl('/profile');
    this.groupService.getGroupsDetails(this.registerService.userInfo.groups);
    this.wrongLoginDetails=false;
   })
   .catch((rej)=>{ 
     console.log(rej.Error.msg);
    if(rej.Error.status=== 401){
     this.wrongLoginDetails=true;
    }})

   
  }
  asd(){
    this.dataService.showOrHideSpinner=true;
  }

  signUp(){
    this.container = 'container right-panel-active'
  }

  signIn(){
    this.container = 'container'

  }
  submitSignUp(){
    var obj = {
      "user": {
        "email" : this.userEmail,
        "firstname" : this.firstName,
        "lastname" : this.lastName,
        "password" : this.userPassword,
        "username" : '',
        "phone" : this.userPhone,
        "pic" : this.userImg,
        "groups" : [],
        "friends" : [],
        "activity" : []
      }
  }
  this.serverApi.signUp(obj)
  .then (()=>  this.signIn());
 
}
alert(){
  alert('assd')
}


  ngOnInit() {
  }

  

}


