import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
import { RegisterService } from '../register.service';
import { DataServiceService } from '../data-service.service';
import { UsersService } from '../users.service';
import { GroupService } from '../group.service';
import { ServerApiService } from '../server-api.service';
let GroupsComponent = class GroupsComponent {
    constructor(registerService, dataService, userService, groupService, serverApi) {
        this.registerService = registerService;
        this.dataService = dataService;
        this.userService = userService;
        this.groupService = groupService;
        this.serverApi = serverApi;
        this.groupListener = new EventEmitter();
        this.wiggle = '';
        this.deleteGroup = false;
        this.groupsList = [];
    }
    openCurrentGroup(group) {
        this.groupListener.emit(group);
        if (this.deleteGroup) {
            this.groupService.deleteGroup(this.dataService.groupId).then((res) => {
                this.registerService.userInfo.groups = res;
                this.groupService.getGroupsDetails(res);
            });
            this.deleteGroup = false;
        }
        else {
            if (!this.dataService.groupId) {
                return;
            }
            this.dataService.hideOrShowGroups = !this.dataService.hideOrShowGroups;
        }
    }
    openDeleteGroup() {
        this.wiggle === '' ? this.wiggle = 'wiggle' : this.wiggle = '';
        this.deleteGroup = true;
        this.serverApi.interactWithServer("DELETE", {
            "imageId": "1234"
        }, 'https://share-it-server.herokuapp.com/items/deleteimage', true);
    }
    openAddGroup() {
        this.dataService.showAddGroup = !this.dataService.showAddGroup;
    }
    ngOnInit() {
        if (this.dataService.groupList.length > 0) {
            //this.openCurrentGroup(this.dataService.groupList[0][0])
        }
        this.serverApi.getGroupsDetails(this.registerService.userInfo.groups)
            .then(res => this.groupsList = res);
    }
};
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], GroupsComponent.prototype, "groupListener", void 0);
GroupsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-groups',
        templateUrl: './groups.component.html',
        styleUrls: ['./groups.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [RegisterService,
        DataServiceService,
        UsersService,
        GroupService,
        ServerApiService])
], GroupsComponent);
export { GroupsComponent };
//# sourceMappingURL=groups.component.js.map