import { Injectable, Inject } from '@angular/core';
import { ServiceHandlerProvider } from '../services/service-handler/service-handler';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../Constants';
import { reject } from 'q';

@Injectable()
export class CardService {
  myData: LoginResponse;

  constructor(
    public serviceHandler: ServiceHandlerProvider,
    @Inject(SESSION_STORAGE) private storage: StorageService,
  ) {
    this.myData = this.storage.get(Constants.USER_DATA);
  }

  getCards(pillarId: string): Observable<any> {
    if (pillarId) {
      return this.serviceHandler.runService(Constants.BASE_URL + "section/" + pillarId, "GET", this.myData.token);
    }
    else {
      throw "You must pass pillar ID";
    }
  }
  async addCard(newCard: CardModel, imageString: string, pillarId: string): Promise<boolean> {
    debugger;
    return new Promise<boolean>((resolve, reject) => {

      const reqeustOptions: any = {
        url: newCard._id ? Constants.BASE_URL + "section/" + pillarId + "/" + newCard._id : Constants.BASE_URL + "section/" + pillarId + "/push-card ",
        method: newCard._id ? "PUT" : "POST",
        requestBody: {
          "title": newCard.title,
          "subtitle": newCard.subtitle
        }
      }
      this.serviceHandler.runService(reqeustOptions.url, reqeustOptions.method, this.myData.token, reqeustOptions.requestBody).subscribe(response => {
        console.log(response);
        if (imageString) {
          const request = {
            "data": imageString
          }
          const url = Constants.BASE_URL + "section/" + (response.id == undefined ? newCard._id : response.id) + "/image";

          this.serviceHandler.runService(url, "PUT", this.myData.token, request).subscribe(res => {

            console.log("Upload image string response");
            console.log(res);
            if (res.done) {
              resolve(true);
            }
            else {
              reject(new Error("Failed to upload image"));
            }
          }, err => {

            reject(err);
          })
        }
        else {
          if (response.done) {
            resolve(true);
          }
          else {
            reject(new Error("Failed to create card"))
          }

        }
      }, error => {
        reject(error);
      });
    });
  }

}
