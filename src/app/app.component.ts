import { Component,HostListener ,OnInit} from '@angular/core';
import  { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { DataServiceService } from './data-service.service';
import { SocketService } from './socket.service';
import { Subscription, timer } from 'rxjs';
import { timeInterval } from 'rxjs/operators';
import { GroupService } from './group.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {

  stockQuote: any;
  sub: Subscription;
  showMsg=false;
  msgContent='';
  friendImg= '';

  constructor(private groupService:GroupService,  public registerService:RegisterService,private router:Router, public dataService:DataServiceService, private socketService:SocketService){
    this.sub = this.socketService.getQuotes()
    .subscribe(quote => {
      //alert(quote.from + " sent you a friend request") ;
     
      this.stockQuote = quote;
      console.log(quote);
      this.showMsg=true;
      setTimeout(()=>{
        this.showMsg=false;

      },8000)   
      this.msgContent = quote.msg;
      this.friendImg = quote.img;
        this.registerService.getMyFriends();
      })

    }

    @HostListener('window:unload', [ '$event' ])
    unloadHandler(event) {
      this.socketService.disconectFromSocket(this.registerService.userInfo.email);
    }
  
  title = 'Share it';
  show=false;
  

 

  test(){
    this.show=true;
    this.myFunction();

  }

  signOut(){
    this.registerService.userInfo = null;
    this.router.navigateByUrl('/login');
  }

  openDebug(){
    this.router.navigateByUrl('/debug');
  }
  openProfile(){

    this.registerService.userInfo ? this.router.navigateByUrl('/profile') : this.router.navigateByUrl('/login') 
  }
  
  openGroups(){
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
  }
  openGraphs(){
    this.router.navigateByUrl('/graphs');
  }

  myFunction() {
    setTimeout(()=> { this.show=false }, 3000);
  }
  
  ngOnInit(){

  }
}
