import { Component, OnInit, EventEmitter } from '@angular/core';
import { formatNumber } from '@angular/common';
import { UsersService } from '../users.service';
import { DataServiceService } from '../data-service.service';
import { RegisterService } from '../register.service';
import { MembersComponent } from '../members/members.component';
import { StatsService } from '../stats.service';
import { ServerApiService } from '../server-api.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  constructor(private serverApi:ServerApiService, public userService:UsersService,public dataService:DataServiceService,public registerService:RegisterService,private statsServie:StatsService) { }
   graphArr=[];
   tableArr=[];
   _reload=true;
    fromValue=null;
    untilValue=null;
    toppings = '';
items=[]
    data=   [
    
      ['January', 0],
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
  
    ]
chart={
  title: 'My spents',
  type: 'ColumnChart',
  width: '100%',
  columnNames:['',''],
  fontSize:'12px',
  
  options:{
    isStacked: true,
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
makeDataForGraph(itemsArray){
 
 itemsArray.map((item)=>{
  this.data[item.date.substring(5,7)-1][1] += item.price ;
 })
 console.log(this.data)
 }

onChange(){
  if(this.fromValue && this.untilValue){
  this.getDataFromServer()
}
}


dateToString(date){
return date.toDateString()
}
getDataFromServer(){
  this.dataService.showOrHideSpinner = true;
  this.serverApi.getChartDetails(this.registerService.userInfo.email,this.dateToString(this.fromValue),this.dateToString(this.untilValue)).then((res:any)=>{
    this.items =res
    this.data=res;
    this.chart.columnNames = res[0];
    this.chart.columnNames.unshift("My Bills")
    this.data.splice(0,1)
    this.reload()
    this.dataService.showOrHideSpinner = false;
  })
}

private reload() {
  setTimeout(() => this._reload = false);
  setTimeout(() => this._reload = true);
}
  ngOnInit() {
   console.log(this.userService.subscribeToDataService())
 
  }

}
