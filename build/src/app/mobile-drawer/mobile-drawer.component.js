import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
let MobileDrawerComponent = class MobileDrawerComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    openGroups() {
        this.router.navigateByUrl('/group');
    }
    openProfile() {
        this.router.navigateByUrl('/profile');
    }
    openFriends() {
        this.router.navigateByUrl('/friends');
    }
    openStats() {
        this.router.navigateByUrl('/graphs');
    }
};
MobileDrawerComponent = tslib_1.__decorate([
    Component({
        selector: 'app-mobile-drawer',
        templateUrl: './mobile-drawer.component.html',
        styleUrls: ['./mobile-drawer.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [Router])
], MobileDrawerComponent);
export { MobileDrawerComponent };
//# sourceMappingURL=mobile-drawer.component.js.map