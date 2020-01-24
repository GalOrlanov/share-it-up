import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {

  constructor(public registerService:RegisterService,private router:Router,public dataService:DataServiceService) { }
  selected = 'profile';
  ngOnInit() {
  }

  signOut(){
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
  openAbout(){
    this.selected='about';
    this.registerService.userInfo ? this.router.navigateByUrl('') : this.router.navigateByUrl('') 
  }
  
  openGroups(){
    this.selected='groups';
    if(this.registerService.userInfo){
    this.dataService.hideOrShowGroups=!this.dataService.hideOrShowGroups;
    if(!this.dataService.groupId){
      return;
    }

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
