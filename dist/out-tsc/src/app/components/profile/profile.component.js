import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../../socket.service';
import { RegisterService } from '../../register.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';
import { DataServiceService } from '../../data-service.service';
let ProfileComponent = class ProfileComponent {
    constructor(socketService, registerService, route, notificationComponent, dataService, router) {
        this.socketService = socketService;
        this.registerService = registerService;
        this.route = route;
        this.notificationComponent = notificationComponent;
        this.dataService = dataService;
        this.router = router;
        this.showAddByEmail = false;
        this.searchStr = '';
        this.showNotification = false;
        this.datatopass = '';
        //subscribe
        this.emailSelected = false;
        this.smsSelected = false;
    }
    changeshowAddByEmail() {
        this.showAddByEmail = !this.showAddByEmail;
    }
    updateUserInfo() {
    }
    setImageSelected(value) {
        if (value === 'sms') {
            this.smsSelected = !this.smsSelected;
        }
        if (value === 'email') {
            this.emailSelected = !this.emailSelected;
        }
    }
    ngOnInit() {
        if (!this.registerService.userInfo) {
            this.registerService.updateUserInfo(null).then(() => {
                if (!this.registerService.userInfo) {
                    this.router.navigateByUrl('/login');
                }
            });
        }
        //this.registerService.addToActivityLog("asdasdasdasdasdasdasd");
        this.socketService.connectToSocket(this.registerService.userInfo.email);
        this.dataService.groupId = this.registerService.userInfo.groups[0] ? this.registerService.userInfo.groups[0] : null;
        this.dataService.showOrHideSpinner = false;
    }
};
ProfileComponent = tslib_1.__decorate([
    Component({
        selector: 'app-profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [SocketService,
        RegisterService,
        ActivatedRoute,
        NotificationComponent,
        DataServiceService,
        Router])
], ProfileComponent);
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map