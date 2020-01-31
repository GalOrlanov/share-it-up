import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let DataServiceService = class DataServiceService {
    constructor() {
        //pass from add-members to add-group
        this.friendsList = [];
        //pass from groups to group Page
        this.showAddGroup = false;
        this.group = {};
        this.groupName = '';
        this.groupImage = '';
        this.groupId = null;
        this.groupList = [];
        this.groupMembers = [];
        this.showAddMember = true;
        this.addMembers = false;
        //hide elements
        this.hideOrShowAddItem = false;
        this.hideOrShowGroups = false;
        //spinner
        this.showOrHideSpinner = false;
        //pass from cloudinary service 
        this.groupImg = null;
        this.groupImgName = '';
        this.proggress = 0;
        this.itemImage = '';
        //show notification
        this.showNotification = false;
        //split Array
        this.splitArray = [];
        this.splitPrice = 0;
        this.splitOrginize = [];
        //resetpassword
        this.openResetPasswordDialog = false;
        //owes orginize
        this.owes = [];
    }
};
DataServiceService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [])
], DataServiceService);
export { DataServiceService };
//# sourceMappingURL=data-service.service.js.map