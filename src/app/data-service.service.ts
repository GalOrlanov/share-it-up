import { Injectable } from '@angular/core';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }
  //pass from add-members to add-group
  friendsList=[];


  //pass from groups to group Page
  showAddGroup=false;
  group: any={}; 
  groupName='';
  groupImage='';
  groupId = null;
  groupList=[];
  groupMembers=[];
  showAddMember=true;
  addMembers=false;

  //hide elements
  hideOrShowAddItem = false;
  hideOrShowGroups= false;

  //spinner
  showOrHideSpinner = false;

    //pass from cloudinary service 
    groupImg = null;
    groupImgName ='';
    proggress:any = 0;
    itemImage=''
    //show notification
    showNotification=false;
   

    //split Array
    splitArray=[];
    splitPrice=0;
    splitOrginize=[];

    //resetpassword
    openResetPasswordDialog=false;


    //owes orginize
    owes =[];
}
