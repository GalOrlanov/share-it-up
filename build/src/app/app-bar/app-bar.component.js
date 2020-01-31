import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { SocketService } from '../socket.service';
let AppBarComponent = class AppBarComponent {
    constructor(registerService, router, dataService, socketService) {
        this.registerService = registerService;
        this.router = router;
        this.dataService = dataService;
        this.socketService = socketService;
        this.selected = 'profile';
    }
    ngOnInit() {
    }
    signOut() {
        this.socketService.disconectFromSocket(this.registerService.userInfo.email);
        this.registerService.userInfo = null;
        this.router.navigateByUrl('/login');
    }
    openDebug() {
        this.router.navigateByUrl('/debug');
        this.selected = 'debug';
    }
    openProfile() {
        this.selected = 'profile';
        this.registerService.userInfo ? this.router.navigateByUrl('/profile') : this.router.navigateByUrl('/login');
    }
    openGroups() {
        this.selected = 'groups';
        if (this.registerService.userInfo) {
            this.dataService.hideOrShowGroups = !this.dataService.hideOrShowGroups;
            this.router.navigateByUrl('/group');
        }
        else {
            this.router.navigateByUrl('/login');
        }
    }
    openFriends() {
        this.router.navigateByUrl('/friends');
        this.selected = 'friends';
    }
    openGraphs() {
        this.router.navigateByUrl('/graphs');
        this.selected = 'graphs';
    }
};
AppBarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-app-bar',
        templateUrl: './app-bar.component.html',
        styleUrls: ['./app-bar.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [RegisterService, Router, DataServiceService, SocketService])
], AppBarComponent);
export { AppBarComponent };
//# sourceMappingURL=app-bar.component.js.map