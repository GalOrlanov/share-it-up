import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let ToolTipComponent = class ToolTipComponent {
    constructor() { }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ToolTipComponent.prototype, "total", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ToolTipComponent.prototype, "splitArray", void 0);
ToolTipComponent = tslib_1.__decorate([
    Component({
        selector: 'app-tool-tip',
        templateUrl: './tool-tip.component.html',
        styleUrls: ['./tool-tip.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ToolTipComponent);
export { ToolTipComponent };
//# sourceMappingURL=tool-tip.component.js.map