import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../register.service';
import { stringify } from '@angular/compiler/src/util';
import { parse } from 'querystring';
import { Router } from '@angular/router'
import {UsersService} from '../../users.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public registerService:RegisterService,private router:Router,private usersService:UsersService) { }
   imagestr = null;  
   SubmitForm(form:any){
     form["pic"]=this.imagestr ? this.imagestr : 'https://res.cloudinary.com/dendjmf47/image/upload/v1573317700/holding_avatar.png' ;
    //this.registerService.add(form);
    
   this.router.navigateByUrl('/login');
   }

   handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];
  
  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
          this.imagestr= btoa(binaryString);
          console.log(btoa(binaryString));
  }

  ngOnInit() {
    
  }

}
