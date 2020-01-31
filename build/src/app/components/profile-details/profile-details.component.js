import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { RegisterService } from '../../register.service';
let ProfileDetailsComponent = class ProfileDetailsComponent {
    constructor(registerService) {
        this.registerService = registerService;
    }
    ngOnInit() {
        console.log(this.test);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], ProfileDetailsComponent.prototype, "test", void 0);
ProfileDetailsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-profile-details',
        templateUrl: './profile-details.component.html',
        styleUrls: ['./profile-details.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [RegisterService])
], ProfileDetailsComponent);
export { ProfileDetailsComponent };
//# sourceMappingURL=profile-details.component.js.map