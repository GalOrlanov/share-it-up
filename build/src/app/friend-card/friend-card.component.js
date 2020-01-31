import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let FriendCardComponent = class FriendCardComponent {
    constructor() { }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], FriendCardComponent.prototype, "image", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], FriendCardComponent.prototype, "name", void 0);
FriendCardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-friend-card',
        templateUrl: './friend-card.component.html',
        styleUrls: ['./friend-card.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], FriendCardComponent);
export { FriendCardComponent };
//# sourceMappingURL=friend-card.component.js.map