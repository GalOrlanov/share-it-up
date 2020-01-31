import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocketService } from './socket.service';
let BillsService = class BillsService {
    constructor(http, socketService) {
        this.http = http;
        this.socketService = socketService;
        this.url = "http://share-it-server.herokuapp.com";
    }
    addItemToBills(itemPrice, splitMembersArray, groupId) {
        splitMembersArray = splitMembersArray.members;
        let obj = {
            itemPrice,
            splitMembersArray: splitMembersArray,
            groupId
        };
        let tokenFromSession = JSON.parse(sessionStorage.getItem('userinfo'));
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token' + " " + tokenFromSession.token
        });
        const promise = new Promise((resolve, reject) => {
            return this.http.post(this.url + '/items/split', obj, { headers: headers }).toPromise().then(res => {
                resolve(res);
            }, msg => {
                reject("Error");
            });
        });
        return promise;
    }
    getBills(id) {
        let tokenFromSession = JSON.parse(sessionStorage.getItem('userinfo'));
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token' + " " + tokenFromSession.token
        });
        const promise = new Promise((resolve, reject) => {
            return this.http.get(this.url + '/items/bills/' + id, { headers }).toPromise()
                .then((res) => {
                resolve(res);
            }, msg => {
                reject("error " + msg);
            });
        });
        return promise;
    }
};
BillsService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, SocketService])
], BillsService);
export { BillsService };
//# sourceMappingURL=bills.service.js.map