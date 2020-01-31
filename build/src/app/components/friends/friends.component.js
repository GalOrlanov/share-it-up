import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { RegisterService } from 'src/app/register.service';
import { UsersService } from 'src/app/users.service';
import { DataServiceService } from 'src/app/data-service.service';
import { SocketService } from 'src/app/socket.service';
import { ServerApiService } from 'src/app/server-api.service';
let FriendsComponent = class FriendsComponent {
    constructor(registerService, userService, dataService, socketService, serverApi) {
        this.registerService = registerService;
        this.userService = userService;
        this.dataService = dataService;
        this.socketService = socketService;
        this.serverApi = serverApi;
        this.showHideDeleteBtn = false;
        this.showAddFriend = false;
    }
    ngOnInit() {
    }
    selectedFriend(selectedFriend) {
        if (!selectedFriend) {
            this.registerService.userInfo.friends.map((friend) => {
                friend.selected = false;
            });
        }
        this.registerService.userInfo.friends.map((friend) => {
            if (friend.email === selectedFriend.email) {
                friend.selected = true;
            }
            else {
                friend.selected = false;
            }
        });
    }
    deleteFriend(friendEmail) {
        let obj = { friendEmail, userEmail: this.registerService.userInfo.email };
        this.serverApi.deleteFriend(obj).then((res) => {
            console.log(res);
        });
    }
};
FriendsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-friends',
        templateUrl: './friends.component.html',
        styleUrls: ['./friends.component.css'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [RegisterService,
        UsersService,
        DataServiceService,
        SocketService,
        ServerApiService])
], FriendsComponent);
export { FriendsComponent };
//# sourceMappingURL=friends.component.js.map