import * as tslib_1 from "tslib";
import { Component, HostListener } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { DataServiceService } from './data-service.service';
import { SocketService } from './socket.service';
import { GroupService } from './group.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        imports: [
            BrowserModule,
            ReactiveFormsModule
        ],
    })
], AppModule);
export { AppModule };
let AppComponent = class AppComponent {
    constructor(groupService, registerService, router, dataService, socketService) {
        this.groupService = groupService;
        this.registerService = registerService;
        this.router = router;
        this.dataService = dataService;
        this.socketService = socketService;
        this.showMsg = false;
        this.msgContent = '';
        this.friendImg = '';
        this.title = 'Share it';
        this.show = false;
        this.sub = this.socketService.getQuotes()
            .subscribe(quote => {
            //alert(quote.from + " sent you a friend request") ;
            this.stockQuote = quote;
            console.log(quote);
            this.showMsg = true;
            setTimeout(() => {
                this.showMsg = false;
            }, 8000);
            this.msgContent = quote.msg;
            this.friendImg = quote.img;
            this.registerService.getMyFriends();
        });
    }
    unloadHandler(event) {
        this.socketService.disconectFromSocket(this.registerService.userInfo.email);
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
tslib_1.__decorate([
    HostListener('window:unload', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AppComponent.prototype, "unloadHandler", null);
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