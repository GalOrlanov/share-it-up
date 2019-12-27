import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { DataServiceService } from '../data-service.service';
import { RegisterService } from '../register.service';
let ItemCardComponent = class ItemCardComponent {
    constructor(userService, dataService, registerService) {
        this.userService = userService;
        this.dataService = dataService;
        this.registerService = registerService;
        this.totalPrice = "ss";
        this.splitArray = [];
    }
    ngOnInit() {
        this.totalPrice = this.price + this.currency;
        this.calculateOwes();
    }
    calculateOwes() {
        this.split.map((split) => {
            if (parseInt(split[3]) < 0) {
                this.split.map((checkSplit, index) => {
                    if (parseInt(checkSplit[3]) > 0) {
                        if (parseInt(split[3]) + parseInt(checkSplit[3]) >= 0) {
                            split[4].push([checkSplit[0], checkSplit[1], -split[3]]);
                            this.split[index][3] = checkSplit[3] + split[3];
                        }
                        else {
                            split[4].push([checkSplit[0], checkSplit[1], checkSplit[3]]);
                            this.split[index][3] = checkSplit[3] + split[3];
                        }
                    }
                });
            }
            this.splitArray.push(split[0] + ' : ' + split[1]);
        });
        this.dataService.owes.push(this.split);
    }
    hoverFunction(id) {
        if (this.hover === id) {
            return true;
        }
        return false;
    }
    showTooltip() {
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ItemCardComponent.prototype, "date", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ItemCardComponent.prototype, "itemName", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ItemCardComponent.prototype, "paidBy", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ItemCardComponent.prototype, "price", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ItemCardComponent.prototype, "itemId", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ItemCardComponent.prototype, "image", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ItemCardComponent.prototype, "hover", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ItemCardComponent.prototype, "id", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ItemCardComponent.prototype, "currency", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ItemCardComponent.prototype, "split", void 0);
ItemCardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-item-card',
        templateUrl: './item-card.component.html',
        styleUrls: ['./item-card.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [UsersService, DataServiceService, RegisterService])
], ItemCardComponent);
export { ItemCardComponent };
//# sourceMappingURL=item-card.component.js.map