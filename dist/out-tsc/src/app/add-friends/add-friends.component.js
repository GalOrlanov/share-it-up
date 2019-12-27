import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { RegisterService } from '../register.service';
import { SocketService } from '../socket.service';
let AddFriendsComponent = class AddFriendsComponent {
    constructor(registerService, socketService) {
        this.registerService = registerService;
        this.socketService = socketService;
        this.showAddByEmail = false;
        this.friendrequest = '';
    }
    sendFriendRequest(email, status) {
        this.registerService.existEmail(email, status).then((res) => {
            if (!res) {
                alert("no such user " + email);
                return;
            }
            this.registerService.userInfo.friends.map((friend) => {
                let statusMsg;
                if (friend.email === email) {
                    if (friend.status === 'true') {
                        statusMsg = 'You and ' + friend.firstname + ' ' + friend.lastname + " Already Friends!";
                    }
                    else if (friend.status === 'sent') {
                        statusMsg = 'You already sent ' + friend.firstname + ' ' + friend.lastname + "A friend request!";
                    }
                    else {
                        statusMsg = 'You can just confirm ' + friend.firstname + ' ' + friend.lastname;
                    }
                    alert(statusMsg);
                    return;
                }
            });
            this.friendrequest = res;
            console.log(res);
            return res;
        }).then((res) => {
            if (!res) {
                return;
            }
            this.friendrequest = res;
            let arr = this.registerService.userInfo.friends;
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
                console.log(obj);
            }
            this.registerService.changeUser({ "friends": arr }, "friends").then((res) => {
                this.socketService.sendserver(email, this.registerService.userInfo.email, this.registerService.userInfo.pic, this.registerService.userInfo.firstname + " " + this.registerService.userInfo.lastname, false, obj.status);
            });
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
    tslib_1.__metadata("design:paramtypes", [RegisterService, SocketService])
], AddFriendsComponent);
export { AddFriendsComponent };
//# sourceMappingURL=add-friends.component.js.map