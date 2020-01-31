import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() { }
 private itemsList = [];

getItems(){
  return this.itemsList;
}

setItems(items){
this.itemsList = items;
}


}
