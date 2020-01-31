import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { RegisterService } from './register.service';
import { UsersService } from './users.service';
import { ServerApiService } from './server-api.service';
let StatsService = class StatsService {
    constructor(serverApi, dataService, registerService, userService) {
        this.serverApi = serverApi;
        this.dataService = dataService;
        this.registerService = registerService;
        this.userService = userService;
    }
    /**
     *
     * @param itemsArray
     * @returns array with all friends owes
     */
    dataForTable(itemsArray) {
        let memberArr = [];
        itemsArray.map((split) => {
            split.split.map(user => {
                let isExist = memberArr.find((userArr) => userArr.email === user.email);
                if (!isExist) {
                    memberArr.push({ name: user.name, email: user.email, oweMe: 0, youOwe: 0 });
                }
            });
        });
        /*this.registerService.userInfo.friends.map((groupMember)=>{
         memberArr.push({name: groupMember.firstname +" " + groupMember.lastname , email: groupMember.email , oweMe: 0 , youOwe: 0 });
        })*/
        itemsArray.map((item) => {
            item.split.map((splitArray) => {
                if (splitArray.email === this.registerService.userInfo.email) {
                    memberArr.map((member) => {
                        splitArray.oweMe.map((owe) => {
                            if (member.email === owe.email) {
                                member.oweMe += owe.owe === undefined ? 0 : owe.owe;
                            }
                        });
                        splitArray.oweTo.map((owe) => {
                            if (member.email === owe.email) {
                                member.youOwe += owe.owe === undefined ? 0 : owe.owe;
                            }
                        });
                    });
                }
            });
        });
        return memberArr;
    }
    /**
     * get the image of friend with his email
     * @param email
     * @returns user Image
     */
    getImageWithEmail(email) {
        let user = this.registerService.userInfo.friends.find(friend => friend.email === email);
        return user.pic;
    }
    getMyOwes(groupId) {
        let group = [];
        if (groupId === 'all') {
            this.serverApi.getAllItems(this.registerService.userInfo.groups)
                .then((res) => group = res.groupArray);
            group = this.dataForTable(group);
        }
        else {
            this.userService.getItemList(groupId);
            group = this.userService.users;
            this.dataForTable(group);
        }
    }
};
StatsService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [ServerApiService, DataServiceService, RegisterService, UsersService])
], StatsService);
export { StatsService };
//# sourceMappingURL=stats.service.js.map