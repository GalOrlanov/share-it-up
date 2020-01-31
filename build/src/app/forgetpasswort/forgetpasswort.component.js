import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { ServerApiService } from '../server-api.service';
let ForgetpasswortComponent = class ForgetpasswortComponent {
    constructor(dataService, serverApi) {
        this.dataService = dataService;
        this.serverApi = serverApi;
        this.email = '';
    }
    ngOnInit() {
    }
};
ForgetpasswortComponent = tslib_1.__decorate([
    Component({
        selector: 'app-forgetpasswort',
        templateUrl: './forgetpasswort.component.html',
        styleUrls: ['./forgetpasswort.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [DataServiceService, ServerApiService])
], ForgetpasswortComponent);
export { ForgetpasswortComponent };
//# sourceMappingURL=forgetpasswort.component.js.map