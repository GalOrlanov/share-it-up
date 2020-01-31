import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../../socket.service';
import { RegisterService } from '../../register.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';
import { DataServiceService } from '../../data-service.service';
import { GroupService } from 'src/app/group.service';
import { UsersService } from 'src/app/users.service';
import { ServerApiService } from 'src/app/server-api.service';
import { StatsService } from 'src/app/stats.service';
let ProfileComponent = class ProfileComponent {
    constructor(socketService, registerService, route, notificationComponent, dataService, router, groupService, userServie, serverApi, statsService) {
        this.socketService = socketService;
        this.registerService = registerService;
        this.route = route;
        this.notificationComponent = notificationComponent;
        this.dataService = dataService;
        this.router = router;
        this.groupService = groupService;
        this.userServie = userServie;
        this.serverApi = serverApi;
        this.statsService = statsService;
        this.showAddByEmail = false;
        this.searchStr = '';
        this.showNotification = false;
        this.datatopass = '';
        this.groupsArray = [];
        //subscribe
        this.emailSelected = false;
        this.settleArray = [];
        this.smsSelected = false;
        this.myOwes = 0;
        console.log("asdajksdkasdj");
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
    getDataForSettleUp() {
        this.registerService.userInfo.groups((group) => {
            this.userServie.getItemList(group);
        });
    }
    getTotalOwe(isMyOwe) {
        let returnValue = 0;
        this.settleArray.map((owe) => {
            isMyOwe ?
                returnValue += owe.oweMe
                :
                    returnValue += owe.youOwe;
        });
        return returnValue.toFixed(0);
    }
    setMyOwes() {
        let max = this.getTotalOwe(true);
        console.log(max);
        setInterval(() => {
            if (this.myOwes >= max) {
                return;
            }
            this.myOwes++;
        }, 0.5);
    }
    ngOnInit() {
        this.groupService.getGroupsDetails(this.registerService.userInfo.groups)
            .then((res) => {
            this.groupsArray = res;
        });
        let obj = { groupArray: this.registerService.userInfo.groups };
        this.serverApi.getAllItems(obj).then((res) => {
            this.settleArray = this.statsService.dataForTable(res.groupArray);
            this.getTotalOwe(false);
            this.setMyOwes();
        });
        if (!this.registerService.userInfo) {
            this.registerService.updateUserInfo(null).then(() => {
                if (!this.registerService.userInfo) {
                    this.router.navigateByUrl('/login');
                }
            });
        }
        /*
       //this.registerService.addToActivityLog("asdasdasdasdasdasdasd");
       this.socketService.connectToSocket(this.registerService.userInfo.email);
       this.dataService.groupId= this.registerService.userInfo.groups[0] ? this.registerService.userInfo.groups[0] : null;
       this.dataService.showOrHideSpinner = false;
       */
    }
};
ProfileComponent = tslib_1.__decorate([
    Component({
        selector: 'app-profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [SocketService,
        RegisterService,
        ActivatedRoute,
        NotificationComponent,
        DataServiceService,
        Router,
        GroupService,
        UsersService,
        ServerApiService,
        StatsService])
], ProfileComponent);
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map