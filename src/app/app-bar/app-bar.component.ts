import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {

  constructor(public registerService:RegisterService,private router:Router,public dataService:DataServiceService, private socketService:SocketService) { }
  selected = 'profile';
  ngOnInit() {
  }

  signOut(){
    this.socketService.disconectFromSocket(this.registerService.userInfo.email);
    this.registerService.userInfo = null;
    this.router.navigateByUrl('/login');
  }

  openDebug(){
    this.router.navigateByUrl('/debug');
    this.selected='debug';
  }
  openProfile(){
    this.selected='profile';
    this.registerService.userInfo ? this.router.navigateByUrl('/profile') : this.router.navigateByUrl('/login') 
  }
  
  openGroups(){
    this.selected='groups';
    if(this.registerService.userInfo){
    this.dataService.hideOrShowGroups=!this.dataService.hideOrShowGroups;
   this.router.navigateByUrl('/group')
  }
  else{
    this.router.navigateByUrl('/login')
  }
  }

  openFriends(){
    this.router.navigateByUrl('/friends');
    this.selected='friends';
  }
  openGraphs(){
    this.router.navigateByUrl('/graphs');
    this.selected='graphs';
  }



}
