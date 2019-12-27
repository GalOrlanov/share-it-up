import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { RegisterService} from '../../register.service';
import { UsersService } from '../../users.service';
import { SocketService } from '../../socket.service'
import { DataServiceService } from 'src/app/data-service.service';
import { AuthService } from 'src/app/auth.service';
import { GroupService } from 'src/app/group.service';
import { ServerApiService } from 'src/app/server-api.service';

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
      userEmail=''
      userPassword=''
      confirmPass=''
      userPhone=''
      userAdress=''
      userImg=null

  SubmitForm(form:any){
   console.log(form);
   var obj = {
    "user": {
      "email" : form.email,
      "password" : form.password
    }
  }
   this.serverApi.login(obj).then( (res ) => {
     console.log(res);
    this.registerService.userInfo = res;
    sessionStorage.setItem('userinfo' , JSON.stringify(res));
    this.authService.loggedIn =true;
    this.router.navigateByUrl('/profile');
    this.socketService.connectToSocket(this.registerService.userInfo.email);
    this.groupService.getGroupsDetails(this.registerService.userInfo.groups);
    this.wrongLoginDetails=false;
   })
   .catch((rej)=>{ 
     console.log(rej.Error.status);
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
console.log(obj)
  this.registerService.add(obj);
  this.signIn();
}



  ngOnInit() {
  }

  

}


