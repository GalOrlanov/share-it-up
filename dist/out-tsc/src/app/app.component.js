import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { DataServiceService } from './data-service.service';
import { SocketService } from './socket.service';
import { GroupService } from './group.service';
let AppComponent = class AppComponent {
    constructor(groupService, registerService, router, dataService, socketService) {
        this.groupService = groupService;
        this.registerService = registerService;
        this.router = router;
        this.dataService = dataService;
        this.socketService = socketService;
        this.showMsg = false;
        this.msgContent = '';
        this.title = 'Share it';
        this.show = false;
        this.sub = this.socketService.getQuotes()
            .subscribe(quote => {
            //alert(quote.from + " sent you a friend request") ;
            this.stockQuote = quote;
            console.log(quote);
            this.registerService.getMyFriends();
            this.showMsg = true;
            setTimeout(() => {
                this.showMsg = false;
            }, 8000);
            if (this.stockQuote.status === 'deleteFromGroup') {
                this.msgContent = 'delete you from group!';
            }
            if (this.stockQuote.confirm) {
                this.msgContent = 'Confirm You Friend Request!';
                this.stockQuote.sent = false;
            }
            else if (this.stockQuote.sent) {
                this.msgContent = 'Sent You A Friend request!';
            }
            if (this.stockQuote.delete === true) {
                this.msgContent = 'Unfriend You! :( ';
                var friendsArr = [];
                this.registerService.userInfo.friends.map((friend, index) => {
                    if (friend.email === this.stockQuote.from) {
                    }
                    else {
                        friendsArr.push(friend);
                    }
                });
                this.registerService.changeUser({ "friends": friendsArr }, "friends");
                this.registerService.getMyFriends();
            }
        });
    }
    test() {
        this.show = true;
        this.myFunction();
    }
    signOut() {
        this.registerService.userInfo = null;
        this.router.navigateByUrl('/login');
    }
    openDebug() {
        this.router.navigateByUrl('/debug');
    }
    openProfile() {
        this.registerService.userInfo ? this.router.navigateByUrl('/profile') : this.router.navigateByUrl('/login');
    }
    openGroups() {
        if (this.registerService.userInfo) {
            this.dataService.hideOrShowGroups = !this.dataService.hideOrShowGroups;
            if (!this.dataService.groupId) {
                return;
            }
            this.router.navigateByUrl('/group');
        }
        else {
            this.router.navigateByUrl('/login');
        }
    }
    openFriends() {
        this.router.navigateByUrl('/friends');
    }
    openGraphs() {
        this.router.navigateByUrl('/graphs');
    }
    myFunction() {
        setTimeout(() => { this.show = false; }, 3000);
    }
    ngOnInit() {
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [GroupService, RegisterService, Router, DataServiceService, SocketService])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map