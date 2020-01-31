import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { RegisterService } from '../register.service';
import { SocketService } from '../socket.service';
import { ServerApiService } from '../server-api.service';
let AddFriendsComponent = class AddFriendsComponent {
    constructor(registerService, socketService, serverApi) {
        this.registerService = registerService;
        this.socketService = socketService;
        this.serverApi = serverApi;
        this.showAddByEmail = false;
        this.friendrequest = '';
    }
    sendFriendRequest(friendEmail) {
        let obj = { friendEmail, userEmail: this.registerService.userInfo.email };
        this.serverApi.sendFriendRequest(obj).then((res) => {
            console.log(res);
        });
    }
    ngOnInit() {
    }
};
AddFriendsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-friends',
        templateUrl: './add-friends.component.html',
        styleUrls: ['./add-friends.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [RegisterService, SocketService, ServerApiService])
], AddFriendsComponent);
export { AddFriendsComponent };
//# sourceMappingURL=add-friends.component.js.map