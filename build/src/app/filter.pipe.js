import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let FilterPipe = class FilterPipe {
    transform(search, searchStr) {
        if (searchStr === undefined)
            return search;
        return search.filter(function (xx) {
            return xx.firstname.toLowerCase().includes(searchStr.toLowerCase()) + xx.lastname.toLowerCase().includes(searchStr.toLowerCase());
        });
    }
};
FilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'filter'
    })
], FilterPipe);
export { FilterPipe };
//# sourceMappingURL=filter.pipe.js.map