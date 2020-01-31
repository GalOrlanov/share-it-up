import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
let ServerApiService = class ServerApiService {
    constructor(http) {
        this.http = http;
        //url = "http://share-it-server.herokuapp.com"
        this.url = "http://192.168.1.9:3000";
    }
    //url = "http://10.0.0.15:3000"
    interactWithServer(requestType, obj, url, token) {
        let tokenFromsession = JSON.parse(sessionStorage.getItem('userinfo'));
        let serverRequest;
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': token ? 'Token ' + tokenFromsession.token : ''
        });
        switch (requestType) {
            case "POST":
                serverRequest = this.http.request("post", url, { body: obj, headers: headers });
                break;
            case "DELETE":
                serverRequest = this.http.request("delete", url, { body: obj, headers: headers });
                break;
            case "PUT":
                serverRequest = this.http.request("put", url, { body: obj, headers: headers });
                break;
            case "GET":
                serverRequest = this.http.request("get", url, { headers: headers });
                break;
        }
        const promise = new Promise((resolve, reject) => {
            return serverRequest.toPromise().then(res => { resolve(res); }, msg => { reject({ "Error": msg }); });
        });
        return promise;
    }
    /**
     ************* cloudinary *************
     */
    deleteImage(obj) {
        console.log(obj);
        let url = `${this.url}/items/deleteimage`;
        return this.interactWithServer('DELETE', obj, url, true);
    }
    /**
     *************** users ***************
     */
    login(obj) {
        let url = `${this.url}/api/users/login`;
        return this.interactWithServer('POST', obj, url, false);
    }
    signUp(useDetails) {
        let url = `${this.url}/api/users/`;
        return this.interactWithServer('POST', useDetails, url, false);
    }
    resetPassword(email) {
        let url = `${this.url}/api/users/changepassword/${email}`;
        return this.interactWithServer("GET", null, url, false);
    }
    /***********groups **********/
    getAllItems(groupArr) {
        let url = `${this.url}/items/allitems`;
        return this.interactWithServer("POST", groupArr, url, true);
    }
    getGroupMembers(groupId) {
        let url = `${this.url}/api/users/group/members/${groupId}`;
        return this.interactWithServer("GET", null, url, true);
    }
    getGroupsDetails(groupsArray) {
        let url = `${this.url}/api/users/group/details`;
        return this.interactWithServer("POST", { groupsArray }, url, true);
    }
    /*******************   Friends  ******************/
    /**
     *
     * @param obj {friendEmail : 'friend email ' , userEmail : 'my email'}
     * @example {friendEmail : 'friend email ' , userEmail : 'my email'}
     */
    sendFriendRequest(obj) {
        let url = `${this.url}/api/users/friends/sendfriendrequest`;
        return this.interactWithServer("POST", obj, url, true);
    }
    confirmFriendRequest(obj) {
        let url = `${this.url}/api/users/friends/confirmrequest`;
        return this.interactWithServer("POST", obj, url, true);
    }
    deleteFriend(obj) {
        let url = `${this.url}/api/users/friends/deletefriend`;
        return this.interactWithServer("DELETE", obj, url, true);
    }
    /******************** Items  ***********************/
    getItems(groupId, startDate, endDate) {
        let url = `${this.url}/items/${groupId}/${startDate}/${endDate}`;
        return this.interactWithServer("GET", null, url, true);
    }
    deleteItem(groupId, itemId) {
        let url = `${this.url}/items/${groupId}/${itemId}`;
        return this.interactWithServer("DELETE", null, url, true);
    }
    addItem(item) {
        let url = `${this.url}/items/`;
        return this.interactWithServer("POST", item, url, true);
    }
    /******************* STATS *******************/
    getChartDetails(email, startDate, endDate) {
        let url = `${this.url}/items/stats/${startDate}/${endDate}/${email}`;
        return this.interactWithServer("GET", null, url, true);
    }
};
ServerApiService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], ServerApiService);
export { ServerApiService };
//# sourceMappingURL=server-api.service.js.map