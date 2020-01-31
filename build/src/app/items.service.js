import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let ItemsService = class ItemsService {
    constructor() {
        this.itemsList = [];
    }
    getItems() {
        return this.itemsList;
    }
    setItems(items) {
        this.itemsList = items;
    }
};
ItemsService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ItemsService);
export { ItemsService };
//# sourceMappingURL=items.service.js.map