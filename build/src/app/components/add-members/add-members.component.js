import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { RegisterService } from '../../register.service';
import { DataServiceService } from '../../data-service.service';
import { GroupService } from 'src/app/group.service';
import { ServerApiService } from 'src/app/server-api.service';
let AddMembersComponent = class AddMembersComponent {
    constructor(groupService, serverApi, registerService, dataService) {
        this.groupService = groupService;
        this.serverApi = serverApi;
        this.registerService = registerService;
        this.dataService = dataService;
        this.searchStr = '';
        this.friendsList = [];
    }
    asd(fr) {
        this.friendsList.map((friend) => {
            if (friend === fr)
                return false;
        });
        return true;
    }
    passDataToAddGroup(friend) {
        //check if its a new group to add or it need to be change
        if (!this.isNewUser) {
            console.log("not anew user");
            this.friendsList.push(friend);
            this.dataService.friendsList = this.friendsList;
        }
        else {
            console.log("new userrrrr");
            let arr = this.registerService.userInfo.groups;
            arr.map((group) => {
                if (group.id === this.dataService.groupId) {
                    group.members.push(friend);
                }
            });
            console.log(arr);
            this.groupService.addMemberToGroup(this.groupId, friend).then(() => {
                this.serverApi.getGroupMembers(this.groupId);
                this.dataService.showAddMember = false;
            });
        }
    }
    checkIfMemberInGroup(friend) {
        var inGroup = true;
        this.dataService.groupMembers.map((groupMember) => {
            if (friend.email === groupMember.email) {
                inGroup = false;
            }
        });
        return inGroup;
    }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    Input('newUser'),
    tslib_1.__metadata("design:type", Boolean)
], AddMembersComponent.prototype, "isNewUser", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], AddMembersComponent.prototype, "newGroup", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], AddMembersComponent.prototype, "groupId", void 0);
AddMembersComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-members',
        templateUrl: './add-members.component.html',
        styleUrls: ['./add-members.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [GroupService, ServerApiService, RegisterService, DataServiceService])
], AddMembersComponent);
export { AddMembersComponent };
//# sourceMappingURL=add-members.component.js.map