import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { DataServiceService } from './data-service.service';
import { ServerApiService } from './server-api.service';
let CloudinaryService = class CloudinaryService {
    constructor(dataService, serverApi) {
        this.dataService = dataService;
        this.serverApi = serverApi;
        this.uploader = new CloudinaryUploader(new CloudinaryOptions({ cloudName: 'dendjmf47', uploadPreset: 'ml_default' }));
    }
    upload(evt, type) {
        var url = "https://res.cloudinary.com/dendjmf47/image/upload/";
        this.uploader.uploadAll();
        this.uploader.onSuccessItem = (item, response, status, headers) => {
            switch (type) {
                case 'group': {
                    this.dataService.groupImgName = item.file.name;
                    this.dataService.groupImg = url + item.file.name;
                    break;
                }
                case 'item': {
                    this.dataService.itemImage = url + item.file.name;
                    break;
                }
            }
        };
        this.uploader.onProgressAll = (progress) => {
            console.log(progress);
            this.dataService.proggress = progress;
        };
        this.uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
    }
    deleteImage(imageId) {
        let obj = { "imageId": imageId };
        this.serverApi.deleteImage(obj);
    }
};
CloudinaryService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [DataServiceService, ServerApiService])
], CloudinaryService);
export { CloudinaryService };
//# sourceMappingURL=cloudinary.service.js.map