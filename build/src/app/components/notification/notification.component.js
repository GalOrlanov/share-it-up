import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';
let NotificationComponent = class NotificationComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.show = true;
    }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NotificationComponent.prototype, "img", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NotificationComponent.prototype, "msg", void 0);
NotificationComponent = tslib_1.__decorate([
    Component({
        selector: 'app-notification',
        templateUrl: './notification.component.html',
        styleUrls: ['./notification.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [DataServiceService])
], NotificationComponent);
export { NotificationComponent };
//# sourceMappingURL=notification.component.js.map