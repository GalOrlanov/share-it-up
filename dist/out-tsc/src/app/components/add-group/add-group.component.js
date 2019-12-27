import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DataServiceService } from '../../data-service.service';
import { RegisterService } from '../../register.service';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { CloudinaryService } from 'src/app/cloudinary.service';
import { GroupService } from 'src/app/group.service';
import { ServerApiService } from 'src/app/server-api.service';
let AddGroupComponent = class AddGroupComponent {
    constructor(dataService, registerService, cloudinaryService, groupService, serverApi) {
        this.dataService = dataService;
        this.registerService = registerService;
        this.cloudinaryService = cloudinaryService;
        this.groupService = groupService;
        this.serverApi = serverApi;
        this.group = {
            name: '',
            pic: null,
            members: [],
            id: '',
            admin: false
        };
        this.uploader = new CloudinaryUploader(new CloudinaryOptions({
            cloudName: 'dendjmf47',
            uploadPreset: 'ml_default'
        }));
    }
    upload(evt) {
        this.cloudinaryService.upload(evt, 'group');
        this.group.pic = this.dataService.groupImg;
    }
    setShowMember() {
        this.dataService.showAddMember = !this.dataService.showAddMember;
    }
    closeAddGroup() {
        this.dataService.showAddGroup = !this.dataService.showAddGroup;
        let obj = { "imageId": this.dataService.groupImgName.split('.jpg')[0] };
        this.serverApi.deleteImage(obj);
        this.dataService.groupImage = null;
    }
    makeid() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    makeGroup(name) {
        let obj = {
            email: this.registerService.userInfo.email,
            firstname: this.registerService.userInfo.firstname,
            lastname: this.registerService.userInfo.lastname,
            pic: this.registerService.userInfo.pic,
            admin: true
        };
        this.dataService.friendsList.push(obj);
        this.group.name = name;
        this.group.members = this.dataService.friendsList;
        this.group.id = this.makeid();
        this.group.pic = this.dataService.groupImg ? this.dataService.groupImg : 'https://res.cloudinary.com/dendjmf47/image/upload/v1573317700/holding_avatar.png';
        this.groupService.addMemberToGroup(this.group.id, obj).then((res) => {
            console.log(res);
            this.groupService.setGroupDetails(this.group.id, this.group.name, this.group.pic).then((response) => {
                this.registerService.userInfo.groups.push(this.group.id);
                this.groupService.getGroupsDetails(this.registerService.userInfo.groups);
                this.groupService.getGroupMembers(this.group.id);
                this.dataService.showAddGroup = false;
                this.dataService.groupImage = null;
            });
        });
    }
    handleFileSelect(evt) {
        var files = evt.target.files;
        var file = files[0];
        if (files && file) {
            var reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }
    _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.group.pic = btoa(binaryString);
    }
    ngOnInit() {
    }
};
AddGroupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-group',
        templateUrl: './add-group.component.html',
        styleUrls: ['./add-group.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [DataServiceService,
        RegisterService,
        CloudinaryService,
        GroupService,
        ServerApiService])
], AddGroupComponent);
export { AddGroupComponent };
//# sourceMappingURL=add-group.component.js.map