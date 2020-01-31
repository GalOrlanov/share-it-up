import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocketService } from './socket.service';
import { AuthService } from './auth.service';
import { GroupService } from './group.service';
let RegisterService = class RegisterService {
    constructor(groupService, http, socketService, authService) {
        this.groupService = groupService;
        this.http = http;
        this.socketService = socketService;
        this.authService = authService;
        //url ="https://share-it-server.herokuapp.com/api/users"
        this.url = 'http://localhost:3000/api/users';
        this.userInfo = '';
        this.userToken = '';
        this.friendrequest = {};
    }
    //change my user after friends request
    changeUser(obj, objType) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token' + " " + this.userInfo.token
        });
        headers.append('access-control-allow-methods', 'PUT');
        const promise = new Promise((resolve, reject) => {
            return this.http.put(this.url + '/' + this.userInfo._id, obj, { headers: headers }).toPromise().then(res => {
                //this.userInfo[objType]=res[objType];
                console.log(this.userInfo[objType]);
                this.updateUserInfo(objType);
                resolve(res);
            }, msg => {
                reject("Error");
            });
        });
        return promise;
    }
    existEmail(email, status) {
        let obj = {
            'email': email,
            "firstname": this.userInfo.firstname,
            "lastname": this.userInfo.lastname,
            "sentemail": this.userInfo.email,
            "pic": this.userInfo.pic
        };
        obj["status"] = status == 'sent' ? 'confirm' : 'true';
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token' + " " + this.userInfo.token
        });
        const promise = new Promise((resolve, reject) => {
            return this.http.post(this.url + '/friend', obj, { headers: headers }).toPromise().then(res => {
                resolve(res);
                console.log("Respons from exist: " + JSON.stringify(res));
                //this.userInfo=res;
                this.updateUserInfo("friends");
            }, msg => {
                reject("Error" + msg);
            });
        });
        return promise;
    }
    updateUserInfo(obj) {
        if (this.userInfo) {
            return;
        }
        const promise = new Promise((resolve, reject) => {
            return this.http.get(this.url + '/validlogin/').toPromise().then(res => {
                console.log(res);
                if (res === { "error": "not" }) {
                    return;
                }
                else {
                    if (obj === null) {
                        this.userInfo = res;
                        this.authService.loggedIn = true;
                        this.groupService.getGroupsDetails(this.userInfo.groups);
                        sessionStorage.setItem('userinfo', JSON.stringify(res));
                    }
                    else {
                        this.userInfo[obj] = res[obj];
                    }
                    console.log('after update:');
                    console.log(obj === null ? res : res[obj]);
                    resolve(res);
                }
            }, msg => {
                reject("Error");
            });
        });
        return promise;
    }
    sendFriendRequest(email, status) {
        this.existEmail(email, status).then((res) => {
            if (!res) {
                alert("no such user " + email);
                return;
            }
            this.friendrequest = res;
            return res;
        }).then((res) => {
            if (!res) {
                return;
            }
            this.friendrequest = res;
            let arr = this.userInfo.friends;
            let obj = {
                "firstname": this.friendrequest.firstname,
                "lastname": this.friendrequest.lastname,
                "email": this.friendrequest.email,
                "emailsent": this.friendrequest.emailsent,
                "pic": this.friendrequest.pic,
                "status": 'sent'
            };
            if (status == 'sent') {
                obj.status = "sent";
                arr.push(obj);
            }
            if (status == 'true') {
                for (var i = 0; i < arr.length; i++) {
                    if (email == arr[i].email) {
                        arr[i].status = 'true';
                    }
                }
            }
            else {
                //arr.push(obj);
                console.log(arr);
            }
            this.changeUser({ "friends": arr }, "friends").then((res) => {
                this.socketService.sendserver(email, this.userInfo.email, this.userInfo.pic, this.userInfo.firstname + " " + this.userInfo.lastname, false, obj.status);
            });
        });
    }
    getMyFriends() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token' + " " + this.userInfo.token
        });
        const promise = new Promise((resolve, reject) => {
            return this.http.get(this.url + '/getmyfriends/' + this.userInfo.email, { headers: headers }).toPromise().then(res => {
                this.userInfo.friends = res;
                console.log(this.userInfo.friends);
                resolve(res);
            }, msg => {
                reject("cannot get friends!");
            });
        });
        return promise;
    }
};
RegisterService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [GroupService, HttpClient, SocketService, AuthService])
], RegisterService);
export { RegisterService };
//# sourceMappingURL=register.service.js.map