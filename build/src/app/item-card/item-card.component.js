import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { DataServiceService } from '../data-service.service';
import { RegisterService } from '../register.service';
import { ServerApiService } from '../server-api.service';
let ItemCardComponent = class ItemCardComponent {
    constructor(userService, dataService, registerService, serverApi) {
        this.userService = userService;
        this.dataService = dataService;
        this.registerService = registerService;
        this.serverApi = serverApi;
        this.totalPrice = "ss";
        this.splitArray = [];
    }
    ngOnInit() {
        this.totalPrice = this.price + this.currency;
        this.calculateOwes();
    }
    calculateOwes() {
        this.split.map((member) => {
            this.splitArray.push(`${member.name}-   ${member.totalPay}${this.currency}`);
        });
    }
    deleteItem() {
        this.serverApi.deleteItem(this.groupId, this.id);
    }
    hoverFunction(id) {
        if (this.hover === id) {
            return true;
        }
        return false;
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
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ItemCardComponent.prototype, "groupId", void 0);
ItemCardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-item-card',
        templateUrl: './item-card.component.html',
        styleUrls: ['./item-card.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [UsersService,
        DataServiceService,
        RegisterService,
        ServerApiService])
], ItemCardComponent);
export { ItemCardComponent };
//# sourceMappingURL=item-card.component.js.map