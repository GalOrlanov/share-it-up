import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let SettleUpCardComponent = class SettleUpCardComponent {
    constructor() { }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], SettleUpCardComponent.prototype, "image", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], SettleUpCardComponent.prototype, "name", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], SettleUpCardComponent.prototype, "youOwe", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], SettleUpCardComponent.prototype, "oweYou", void 0);
SettleUpCardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-settle-up-card',
        templateUrl: './settle-up-card.component.html',
        styleUrls: ['./settle-up-card.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], SettleUpCardComponent);
export { SettleUpCardComponent };
//# sourceMappingURL=settle-up-card.component.js.map