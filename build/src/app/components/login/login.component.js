import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../register.service';
import { UsersService } from '../../users.service';
import { SocketService } from '../../socket.service';
import { DataServiceService } from 'src/app/data-service.service';
import { AuthService } from 'src/app/auth.service';
import { GroupService } from 'src/app/group.service';
import { ServerApiService } from 'src/app/server-api.service';
let LoginComponent = class LoginComponent {
    constructor(registerService, socketService, router, usersService, dataService, authService, groupService, serverApi) {
        this.registerService = registerService;
        this.socketService = socketService;
        this.router = router;
        this.usersService = usersService;
        this.dataService = dataService;
        this.authService = authService;
        this.groupService = groupService;
        this.serverApi = serverApi;
        this.container = 'container';
        this.wrongLoginDetails = false;
        this.openForgetPassword = false;
        this.firstName = '';
        this.lastName = '';
        this.userEmail = 'galorlanov@gmail.com';
        this.userPassword = '111';
        this.confirmPass = '';
        this.userPhone = '';
        this.userAdress = '';
        this.userImg = null;
    }
    SubmitForm(form) {
        var obj = {
            "user": {
                "email": form.email,
                "password": form.password
            }
        };
        this.serverApi.login(obj).then((res) => {
            this.registerService.userInfo = res;
            this.socketService.connectToSocket(res.email);
            sessionStorage.setItem('userinfo', JSON.stringify(res));
            this.authService.loggedIn = true;
            this.router.navigateByUrl('/profile');
            this.groupService.getGroupsDetails(this.registerService.userInfo.groups);
            this.wrongLoginDetails = false;
        })
            .catch((rej) => {
            console.log(rej.Error.msg);
            if (rej.Error.status === 401) {
                this.wrongLoginDetails = true;
            }
        });
    }
    asd() {
        this.dataService.showOrHideSpinner = true;
    }
    signUp() {
        this.container = 'container right-panel-active';
    }
    signIn() {
        this.container = 'container';
    }
    submitSignUp() {
        var obj = {
            "user": {
                "email": this.userEmail,
                "firstname": this.firstName,
                "lastname": this.lastName,
                "password": this.userPassword,
                "username": '',
                "phone": this.userPhone,
                "pic": this.userImg,
                "groups": [],
                "friends": [],
                "activity": []
            }
        };
        this.serverApi.signUp(obj)
            .then(() => this.signIn());
    }
    alert() {
        alert('assd');
    }
    ngOnInit() {
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [RegisterService,
        SocketService,
        Router,
        UsersService,
        DataServiceService,
        AuthService,
        GroupService,
        ServerApiService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map