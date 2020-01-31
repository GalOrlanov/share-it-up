import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterService } from './register.service';
import { DataServiceService } from './data-service.service';
import { BillsService } from './bills.service';
let UsersService = class UsersService {
    constructor(http, registerService, dataService, billsService) {
        this.http = http;
        this.registerService = registerService;
        this.dataService = dataService;
        this.billsService = billsService;
        //url:string = 'https://share-it-server.herokuapp.com';
        this.url = 'http://192.168.1.9:3000';
        this.name = '';
        this.users = [];
        this.allItems = [];
        this.totalForGroup = 0;
        this.oweMe = 0;
        this.myOwen = 0;
    }
    getItemList(groupId) {
        this.totalForGroup = 0;
        this.oweMe = 0;
        this.dataService.showOrHideSpinner = true;
        let tokenFromSession = JSON.parse(sessionStorage.getItem('userinfo'));
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token' + " " + tokenFromSession.token
        });
        return this.http.get(this.url + "/items/" + groupId + '/null/null', { headers: headers }).subscribe((res) => {
            this.allData$.next(res);
        });
    }
    addItem(obj) {
        let tokenFromSession = JSON.parse(sessionStorage.getItem('userinfo'));
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token' + " " + tokenFromSession.token
        });
        this.http.post(this.url + '/items', obj, { headers: headers })
            .subscribe((res) => {
            this.getItemList(obj.group);
        });
    }
    subscribeToDataService() {
        return this.allData$.asObservable();
    }
    deleteItem(group, id) {
        let tokenFromSession = JSON.parse(sessionStorage.getItem('userinfo'));
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token' + " " + tokenFromSession.token
        });
        this.http.delete(this.url + '/items/' + group + "/" + id, { headers: headers })
            .subscribe((res) => {
            this.getItemList(group);
        });
    }
};
UsersService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, RegisterService, DataServiceService, BillsService])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map