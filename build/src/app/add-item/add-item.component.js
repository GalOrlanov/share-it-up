import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '../users.service';
import { DataServiceService } from '../data-service.service';
import { RegisterService } from '../register.service';
import { CloudinaryService } from 'src/app/cloudinary.service';
import currency from '../../assets/jsons/currency.json';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { ServerApiService } from '../server-api.service';
let AddItemComponent = class AddItemComponent {
    constructor(userService, dataService, registerService, cloudinaryService, serverApi) {
        this.userService = userService;
        this.dataService = dataService;
        this.registerService = registerService;
        this.cloudinaryService = cloudinaryService;
        this.serverApi = serverApi;
        this.ddd = '';
        this.cur = '';
        this.showSplit = 'false';
        this.addDate = new Date().toISOString().split('T')[0];
        this.currencyArray = currency;
        this.itemPrice = 0;
        this.itemImage = '';
        this.serializedDate = new FormControl((new Date()).toISOString());
        this.showImgList = false;
        this.selectedImg = null;
        this.todayDate = new Date();
        this.images = [{
                item: 'milk',
                url: '../../assets/images/milk.jpg'
            }, {
                item: 'water',
                url: '../../assets/images/meiAvivim.jpg'
            }, {
                item: 'electricity',
                url: '../../assets/images/elect.jpg'
            }, {
                item: 'eggs',
                url: '../../assets/images/Eggs-Plate.jpg'
            }
        ];
        this.uploader = new CloudinaryUploader(new CloudinaryOptions({
            cloudName: 'dendjmf47',
            uploadPreset: 'ml_default'
        }));
    }
    onImageClick(url) {
        this.dataService.itemImage = url;
        this.showAndHideImgList();
    }
    upload(evt) {
        this.cloudinaryService.upload(evt, 'item');
    }
    showAndHideImgList() {
        this.showImgList = !this.showImgList;
    }
    getCurrency() {
        return currency;
    }
    closeSplit() {
        this.showSplit = 'false';
    }
    splitOrganize() {
        let members = [];
        let splitPrice = this.itemPrice / this.dataService.splitArray.length;
        this.dataService.splitArray.map((member) => {
            console.log(member);
            let totalOwe = member[1] > splitPrice ? member[1] - splitPrice : 0;
            members.push({ name: member[4], email: member[0], image: member[5], pay: member[1], totalOwe: totalOwe, totalPay: member[1], oweMe: [], oweTo: [] });
        });
        for (let i = 0; i < members.length; i++) {
            if (members[i].pay > splitPrice) {
                for (let j = 0; j < members.length; j++) {
                    //if(members[j] !== members[i]) break;
                    if (members[j].pay < splitPrice) {
                        if (members[i].totalOwe - (splitPrice - members[j].pay) >= 0) {
                            members[i].totalOwe -= splitPrice - members[j].pay;
                            members[i].oweMe.push({
                                name: members[j].name,
                                email: members[j].email,
                                owe: splitPrice - members[j].pay
                            });
                            members[j].oweTo.push({
                                name: members[i].name,
                                email: members[i].email,
                                owe: splitPrice - members[j].pay
                            });
                            members[j].pay = splitPrice - members[j].pay;
                        }
                        else {
                            members[i].oweMe.push({
                                name: members[j].name,
                                email: members[j].email,
                                owe: members[i].totalOwe
                            });
                            members[j].oweTo.push({
                                name: members[i].name,
                                email: members[i].email,
                                owe: members[i].totalOwe
                            });
                            members[j].pay = (splitPrice - members[j].pay) - members[i].totalOwe;
                            members[i].totalOwe = 0;
                        }
                    }
                }
            }
        }
        this.dataService.splitOrginize = members;
        return members;
    }
    SubmitForm(itemForm) {
        localStorage.setItem('currency', this.cur);
        var item = itemForm;
        item.price = this.itemPrice;
        item.date = this.addDate;
        console.log(new Date(this.addDate).getTime());
        item.pic = this.dataService.itemImage ? this.dataService.itemImage : '../../assets/images/itemTag.png';
        item.group = this.groupId;
        item.split = this.splitOrganize();
        item.currency = this.cur.split(' - ')[0];
        item.buyerEmail = this.registerService.userInfo.email;
        item.buyerName = this.registerService.userInfo.firstname + " " + this.registerService.userInfo.lastname;
        this.serverApi.addItem(item).then(res => {
            this.userService.getItemList(this.groupId) `'`;
        });
        this.dataService.hideOrShowAddItem = !this.dataService.hideOrShowAddItem;
        this.dataService.itemImage = '';
    }
    ngOnInit() {
        this.cur = localStorage.getItem('currency');
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AddItemComponent.prototype, "groupMembers", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], AddItemComponent.prototype, "groupId", void 0);
AddItemComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-item',
        templateUrl: './add-item.component.html',
        styleUrls: ['./add-item.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [UsersService,
        DataServiceService,
        RegisterService,
        CloudinaryService,
        ServerApiService])
], AddItemComponent);
export { AddItemComponent };
//# sourceMappingURL=add-item.component.js.map