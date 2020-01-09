import { Component, OnInit } from '@angular/core';
import { formatNumber } from '@angular/common';
import { UsersService } from '../users.service';
import { DataServiceService } from '../data-service.service';
import { RegisterService } from '../register.service';
import { MembersComponent } from '../members/members.component';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  constructor(public userService:UsersService,public dataService:DataServiceService,public registerService:RegisterService,private statsServie:StatsService) { }
   graphArr=[];
   tableArr=[];



chart={
  title: 'asdasdasd',
  type: 'ColumnChart',
  data:   [
    
    ['January', 0,],
    ['February', 0],
    ['March', 0],
    ['April', 0],
    ['May', 0],
    ['June', 0],
    ['July', 0],
    ['August', 0],
    ['September', 0],
    ['October', 0],
    ['November', 0],
    ['December', 0],

  ],
  width: '90%',
  columnNames:['sdf','Total'],
  fontSize:'12px',
  options:{
    is3D: true,
    animation: {
      startup: true,
      duration: 1000,
      easing: 'out',
    },
    annotations :{ 
    textStyle: {
      fontName: 'Times-Roman',
      fontSize: 12,
      italic: true,
      // The color of the text.
      color: '#871b47',
      // The color of the text outline.
      auraColor: '#d799ae',
      // The transparency of the text.
      opacity: 0.8
    }
  },
    vAxis:{
     
    },
    hAxis:{
      
        textStyle: {
          color: '#FF0000',
          fontSize: 14
      }
    }
  
  }

}
makeDataForGraph(){
  if(this.userService.users === undefined){
    return;
  }
 this.userService.users.map((item)=>{
   if(!item.bills)
  this.chart.data[item.date.substring(5,7)-1][1] += item.price ;
 })
 console.log( this.chart.data);
 }

/*
 dataForTable(){
   let memberArr = [];
   this.dataService.groupMembers.map((groupMember)=>{
    memberArr.push({name: groupMember.firstname +" " + groupMember.lastname , email: groupMember.email , oweMe: 0 , youOwe: 0 });
   })
  this.userService.users.map((item)=>{
    item.split.map((splitArray)=>{
    if(splitArray.email === this.registerService.userInfo.email){
        memberArr.map((member)=>{
          splitArray.oweMe.map((owe)=>{
          if(member.email === owe.email){
            member.oweMe += owe.owe === undefined ? 0 : owe.owe
          }
        })
        splitArray.oweTo.map((owe)=>{
          console.log(owe)
          if(member.email === owe.email){
            member.youOwe += owe.owe === undefined ? 0 : owe.owe
          }
        })
     
      })
    
    }
    })
  })

  this.tableArr =memberArr;
 }
*/

  ngOnInit() {
  this.makeDataForGraph();
  this.tableArr = this.statsServie.dataForTable(this.userService.users)
  }

}
