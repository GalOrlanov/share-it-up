import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { DataServiceService } from '../data-service.service';
import { RegisterService } from '../register.service';
import { StatsService } from '../stats.service';
import { ServerApiService } from '../server-api.service';
let GraphsComponent = class GraphsComponent {
    constructor(serverApi, userService, dataService, registerService, statsServie) {
        this.serverApi = serverApi;
        this.userService = userService;
        this.dataService = dataService;
        this.registerService = registerService;
        this.statsServie = statsServie;
        this.graphArr = [];
        this.tableArr = [];
        this._reload = true;
        this.fromValue = null;
        this.untilValue = null;
        this.toppings = '';
        this.items = [];
        this.data = [
            ['January', 0],
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
        ];
        this.chart = {
            title: 'My spents',
            type: 'ColumnChart',
            width: '100%',
            columnNames: ['', ''],
            fontSize: '12px',
            options: {
                isStacked: true,
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
    makeDataForGraph(itemsArray) {
        itemsArray.map((item) => {
            this.data[item.date.substring(5, 7) - 1][1] += item.price;
        });
        console.log(this.data);
    }
    onChange() {
        if (this.fromValue && this.untilValue) {
            this.getDataFromServer();
        }
    }
    dateToString(date) {
        return date.toDateString();
    }
    getDataFromServer() {
        this.dataService.showOrHideSpinner = true;
        this.serverApi.getChartDetails(this.registerService.userInfo.email, this.dateToString(this.fromValue), this.dateToString(this.untilValue)).then((res) => {
            this.items = res;
            this.data = res;
            this.chart.columnNames = res[0];
            this.chart.columnNames.unshift("My Bills");
            this.data.splice(0, 1);
            this.reload();
            this.dataService.showOrHideSpinner = false;
        });
    }
    reload() {
        setTimeout(() => this._reload = false);
        setTimeout(() => this._reload = true);
    }
    ngOnInit() {
        console.log(this.userService.subscribeToDataService());
    }
};
GraphsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-graphs',
        templateUrl: './graphs.component.html',
        styleUrls: ['./graphs.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [ServerApiService, UsersService, DataServiceService, RegisterService, StatsService])
], GraphsComponent);
export { GraphsComponent };
//# sourceMappingURL=graphs.component.js.map