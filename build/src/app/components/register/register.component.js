import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { RegisterService } from '../../register.service';
import { Router } from '@angular/router';
import { UsersService } from '../../users.service';
let RegisterComponent = class RegisterComponent {
    constructor(registerService, router, usersService) {
        this.registerService = registerService;
        this.router = router;
        this.usersService = usersService;
        this.imagestr = null;
    }
    SubmitForm(form) {
        form["pic"] = this.imagestr ? this.imagestr : 'https://res.cloudinary.com/dendjmf47/image/upload/v1573317700/holding_avatar.png';
        //this.registerService.add(form);
        this.router.navigateByUrl('/login');
    }
    handleFileSelect(evt) {
        var files = evt.target.files;
        var file = files[0];
        if (files && file) {
            var reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }
    _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.imagestr = btoa(binaryString);
        console.log(btoa(binaryString));
    }
    ngOnInit() {
    }
};
RegisterComponent = tslib_1.__decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [RegisterService, Router, UsersService])
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map