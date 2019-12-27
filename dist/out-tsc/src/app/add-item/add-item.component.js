import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '../users.service';
import { DataServiceService } from '../data-service.service';
import { RegisterService } from '../register.service';
import { CloudinaryService } from 'src/app/cloudinary.service';
import currency from '../../assets/jsons/currency.json';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
let AddItemComponent = class AddItemComponent {
    constructor(userService, dataService, registerService, cloudinaryService) {
        this.userService = userService;
        this.dataService = dataService;
        this.registerService = registerService;
        this.cloudinaryService = cloudinaryService;
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
        let members = [{ name: 'gal', email: 'galoelanov@gmail.com', pay: 200, totalOwe: 125, totalPay: 200, oweMe: [], oweTo: [] },
            { name: 'Natali', email: 'Natali@gmail.com', pay: 100, totalOwe: 25, totalPay: 100, oweMe: [], oweTo: [] },
            { name: 'lihi', email: 'lihi@gmail.com', pay: 0, totalOwe: 75, totalPay: 0, oweMe: [], oweTo: [] },
            { name: 'aa', email: 'aa@gmail.com', pay: 0, totalOwe: 75, totalPay: 0, oweMe: [], oweTo: [] }];
        let splitPrice = 75;
        for (let i = 0; i < members.length; i++) {
            if (members[i].pay > splitPrice) {
                for (let j = 0; j < members.length; j++) {
                    if (members[j] !== members[i])
                        break;
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
        console.log(members);
    }
    SubmitForm(itemForm) {
        localStorage.setItem('currency', this.cur);
        var item = itemForm;
        item.price = this.itemPrice;
        item.date = this.addDate;
        item.pic = this.dataService.itemImage ? this.dataService.itemImage : '../../assets/images/itemTag.png';
        item.group = this.dataService.groupId;
        item.split = this.splitOrganize();
        item.currency = this.cur.split(' - ')[0];
        item.buyerEmail = this.registerService.userInfo.email;
        item.buyerName = this.registerService.userInfo.firstname + " " + this.registerService.userInfo.lastname;
        this.userService.addItem(item);
        this.dataService.hideOrShowAddItem = !this.dataService.hideOrShowAddItem;
        this.dataService.itemImage = '';
        console.log(item);
    }
    ngOnInit() {
        this.cur = localStorage.getItem('currency');
        this.splitOrganize();
    }
};
AddItemComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-item',
        templateUrl: './add-item.component.html',
        styleUrls: ['./add-item.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [UsersService,
        DataServiceService,
        RegisterService,
        CloudinaryService])
], AddItemComponent);
export { AddItemComponent };
//# sourceMappingURL=add-item.component.js.map