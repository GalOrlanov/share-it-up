import * as tslib_1 from "tslib";
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DataServiceService } from '../data-service.service';
let SplitComponent = class SplitComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.memberLength = 3;
        this.value = 100;
        this.passedAmount = false;
        this.check = 0;
        this.notReached = true;
        this.array = ["page 1- kjnasdasdmnasdkmjsdfkjmsjkdfsm,dfj sdjfsdm,fjsdkfksdfjxkfjkxjf", "page 2 - jmhsdfmshbndfmnsdf", "page 3-sdfsdfsdfsdf", "page 4-sdfsdfsdfsdf", "page 5-asdasdasdasdasd"];
        this.totalPrice = this.itemPrice;
        this.totalleft = this.itemPrice;
        this.membersArray = [];
        this.options = {
            floor: 0,
            ceil: this.array.length,
        };
    }
    ngOnInit() {
        this.totalPrice = this.itemPrice;
        this.totalleft = this.itemPrice;
        console.log(this.itemPrice);
        this.groupMembers.map((member) => {
            this.membersArray.push([member.email, 0, { maxLimit: this.totalleft, ceil: this.totalPrice }, this.totalPrice, member.firstname + ' ' + member.lastname, member.pic]);
        });
        console.log(this.membersArray);
    }
    asd(price, index) {
        let total = 0;
        this.membersArray.map((member) => {
            total += parseInt(member[1].toString());
        });
        console.log(price);
        this.totalleft = this.totalPrice - total;
        if (total > this.totalPrice) {
            this.passedAmount = true;
        }
        else {
            this.passedAmount = false;
        }
        if (total < this.totalPrice) {
            this.notReached = true;
        }
        else {
            this.notReached = false;
        }
        this.dataService.splitPrice = this.totalPrice / this.membersArray.length;
        this.dataService.splitArray = this.membersArray;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], SplitComponent.prototype, "itemPrice", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SplitComponent.prototype, "groupMembers", void 0);
SplitComponent = tslib_1.__decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        selector: 'app-split',
        templateUrl: './split.component.html',
        styleUrls: ['./split.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [DataServiceService])
], SplitComponent);
export { SplitComponent };
//# sourceMappingURL=split.component.js.map