import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { DataServiceService } from '../data-service.service';
import { RegisterService } from '../register.service';
let GraphsComponent = class GraphsComponent {
    constructor(userService, dataService, registerService) {
        this.userService = userService;
        this.dataService = dataService;
        this.registerService = registerService;
        this.graphArr = [];
        this.tableArr = [];
        this.chart = {
            title: 'asdasdasd',
            type: 'ColumnChart',
            data: [
                ['January', 0,],
                ['February', 0],
                ['March', 0],
                ['April', 0],
                ['May', 0],
                ['June', 0],
                ['July', 0],
                ['August', 0],
                ['September', 0],
                ['October', 0],
                ['November', 0],
                ['December', 0],
            ],
            width: '90%',
            columnNames: ['sdf', 'Total'],
            fontSize: '12px',
            options: {
                is3D: true,
                animation: {
                    startup: true,
                    duration: 1000,
                    easing: 'out',
                },
                annotations: {
                    textStyle: {
                        fontName: 'Times-Roman',
                        fontSize: 12,
                        italic: true,
                        // The color of the text.
                        color: '#871b47',
                        // The color of the text outline.
                        auraColor: '#d799ae',
                        // The transparency of the text.
                        opacity: 0.8
                    }
                },
                vAxis: {},
                hAxis: {
                    textStyle: {
                        color: '#FF0000',
                        fontSize: 14
                    }
                }
            }
        };
    }
    makeDataForGraph() {
        if (this.userService.users === undefined) {
            return;
        }
        this.userService.users.map((item) => {
            if (!item.bills)
                this.chart.data[item.date.substring(5, 7) - 1][1] += item.price;
        });
        console.log(this.chart.data);
    }
    dataForTable() {
        this.dataService.owes.map((row) => {
            if (row[2] === this.registerService.userInfo.email) {
                row[4].map((owe) => {
                    this.tableArr.push([owe[0], owe[2]]);
                });
            }
        });
        console.log(this.tableArr);
    }
    ngOnInit() {
        this.makeDataForGraph();
        console.log(this.dataService.owes);
        this.dataForTable();
    }
};
GraphsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-graphs',
        templateUrl: './graphs.component.html',
        styleUrls: ['./graphs.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [UsersService, DataServiceService, RegisterService])
], GraphsComponent);
export { GraphsComponent };
//# sourceMappingURL=graphs.component.js.map