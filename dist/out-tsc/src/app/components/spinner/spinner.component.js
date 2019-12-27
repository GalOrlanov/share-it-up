import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';
let SpinnerComponent = class SpinnerComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.color = 'blue';
    }
    ngOnInit() {
    }
};
SpinnerComponent = tslib_1.__decorate([
    Component({
        selector: 'app-spinner',
        templateUrl: './spinner.component.html',
        styleUrls: ['./spinner.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [DataServiceService])
], SpinnerComponent);
export { SpinnerComponent };
//# sourceMappingURL=spinner.component.js.map