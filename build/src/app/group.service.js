import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataServiceService } from './data-service.service';
import { SocketService } from './socket.service';
let GroupService = class GroupService {
    constructor(http, dataService, socketService) {
        this.http = http;
        this.dataService = dataService;
        this.socketService = socketService;
    }
    getGroupsDetails(groupsArray) {
        // let groupsArray = this.registerService.userInfo.groups;
        console.log(groupsArray);
        let tokenFromsession = JSON.parse(sessionStorage.getItem('userinfo'));
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token' + " " + tokenFromsession.token
        });
        const promise = new Promise((resolve, reject) => {
            return this.http.post('https://share-it-server.herokuapp.com/api/users/group/details', { groupsArray }, { headers: headers }).toPromise().then(res => {
                this.dataService.groupList = res;
                console.log(this.dataService.groupList);
                resolve(res);
            }, msg => {
                reject("Error");
            });
        });
        return promise;
    }
    setGroupDetails(groupId, groupName, groupImage) {
        let obj = {
            groupId,
            details: {
                groupName,
                groupImage,
            }
        };
        let tokenFromsession = JSON.parse(sessionStorage.getItem('userinfo'));
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token' + " " + tokenFromsession.token
        });
        const promise = new Promise((resolve, reject) => {
            return this.http.post('https://share-it-server.herokuapp.com/api/users/group/detailsupdate/', obj, { headers: headers }).toPromise().then(res => {
                console.log(res);
                resolve(res);
            }, msg => {
                reject("Error");
            });
        });
        return promise;
    }
    addMemberToGroup(groupId, user) {
        let tokenFromsession = JSON.parse(sessionStorage.getItem('userinfo'));
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token' + " " + tokenFromsession.token
        });
        //headers.append('access-control-allow-methods' , 'PUT');
        let obj = { user: {}, groupId: '' };
        obj.user = user;
        obj.groupId = groupId;
        const promise = new Promise((resolve, reject) => {
            return this.http.post('https://share-it-server.herokuapp.com/api/users/group/addmember', obj, { headers: headers }).toPromise().then(res => {
                console.log(res);
                resolve(res);
            }, msg => {
                reject("Error");
            });
        });
        return promise;
    }
    deleteMemberFromGroup(groupId, userEmail) {
        let tokenFromsession = JSON.parse(sessionStorage.getItem('userinfo'));
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token' + " " + tokenFromsession.token
        });
        const promise = new Promise((resolve, reject) => {
            return this.http.post('https://share-it-server.herokuapp.com/api/users/group/deletemember/', { groupId, userEmail }, { headers: headers }).toPromise().then(res => {
                console.log(res);
                resolve(res);
            }, msg => {
                reject("Error");
            });
        });
        return promise;
    }
    deleteGroup(groupId) {
        console.log("delete Group - " + groupId);
        let tokenFromsession = JSON.parse(sessionStorage.getItem('userinfo'));
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token' + " " + tokenFromsession.token
        });
        const promise = new Promise((resolve, reject) => {
            return this.http.delete('https://share-it-server.herokuapp.com/api/users/group/delete/' + groupId, { headers: headers }).toPromise().then(res => {
                resolve(res);
            }, msg => {
                reject("Error");
            });
        });
        return promise;
    }
};
GroupService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, DataServiceService, SocketService])
], GroupService);
export { GroupService };
//# sourceMappingURL=group.service.js.map