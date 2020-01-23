import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mobile-drawer',
  templateUrl: './mobile-drawer.component.html',
  styleUrls: ['./mobile-drawer.component.css']
})
export class MobileDrawerComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit() {
  }
  openGroups(){
  this.router.navigateByUrl('/group')
  }
  openProfile(){
    this.router.navigateByUrl('/profile')
    }

    openFriends(){
      this.router.navigateByUrl('/friends')
    }

    openStats(){
      this.router.navigateByUrl('/graphs')
    }
    
}
