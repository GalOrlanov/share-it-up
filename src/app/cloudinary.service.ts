import { Injectable } from '@angular/core';
import { CloudinaryOptions, CloudinaryUploader  } from 'ng2-cloudinary';
import { DataServiceService } from './data-service.service';
import { ServerApiService } from './server-api.service';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(public dataService:DataServiceService,public serverApi:ServerApiService) { }

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'dendjmf47', uploadPreset: 'ml_default'  })
    );

    upload(evt,type){
      var url = "https://res.cloudinary.com/dendjmf47/image/upload/"
      this.uploader.uploadAll();
      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
        switch(type){
          case 'group':{
              this.dataService.groupImgName = item.file.name;
              this.dataService.groupImg = url + item.file.name;
              break;
        }
        case 'item':{
          this.dataService.itemImage = url + item.file.name;
          break;
        }
      }
       }

       
       this.uploader.onProgressAll = (progress) =>{
         console.log(progress)
         this.dataService.proggress=progress;
       }
       this.uploader.onErrorItem = function(fileItem, response, status, headers) {
          console.info('onErrorItem', fileItem, response, status, headers);
        };
    }

    deleteImage(imageId){
      let obj = {"imageId": imageId}
      this.serverApi.deleteImage(obj);
    }

   
     
  
}
