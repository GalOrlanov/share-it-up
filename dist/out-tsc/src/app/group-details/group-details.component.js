import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { DataServiceService } from '../data-service.service';
let GroupDetailsComponent = class GroupDetailsComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], GroupDetailsComponent.prototype, "totalMembers", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], GroupDetailsComponent.prototype, "totalPrice", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], GroupDetailsComponent.prototype, "myOwe", void 0);
GroupDetailsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-group-details',
        templateUrl: './group-details.component.html',
        styleUrls: ['./group-details.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [DataServiceService])
], GroupDetailsComponent);
export { GroupDetailsComponent };
//# sourceMappingURL=group-details.component.js.map