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
          const url = Constants.BASE_URL + "section/" + pillarId + "/" + (response.id == undefined ? newCard._id : response.id) + "/image";

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
          resolve(true);
        }
      }, error => {
        reject(error);
      });
    });
  }
  async deleteCard(cardId: string, pillarId: string) {
    return new Promise<boolean>((resolve, reject) => {
      const reqeustOptions: any = {
        url: Constants.BASE_URL + "section/" + pillarId + "/pull-card/" + cardId,
        method: "POST",
      }
      this.serviceHandler.runService(reqeustOptions.url, reqeustOptions.method, this.myData.token).subscribe(response => {
        console.log(response);
        if (response.done) {
          resolve(true);
        }
        else {
          reject(new Error("Failed to remove card!"));
        }
      }, error => {
        reject(error);
      });
    });
  }
  async pushNewTemplate(name: string, buttonId: string, templateType: string, pillarId: string, cardId: string) {
    return new Promise<boolean>((resolve, reject) => {
      const reqeustOptions: any = {
        url: Constants.BASE_URL + "section/" + pillarId + "/" + cardId + "/push-template/" + buttonId,
        method: "POST",
        requestBody: {
          title: name,
          payload: {
            templateType: templateType
          }
        }
      }
      this.serviceHandler.runService(reqeustOptions.url, reqeustOptions.method, this.myData.token, reqeustOptions.requestBody).subscribe(response => {
        console.log(response);
        if (response.done) {
          resolve(true);
        }
        else {
          reject(new Error("Failed to remove card!"));
        }
      }, error => {
        reject(error);
      });
    });

  }
  async pullTemplate(pillarId: string, cardId: string, tempId: string) {
    return new Promise<boolean>((resolve, reject) => {
      const reqeustOptions: any = {
        url: Constants.BASE_URL + "section/" + pillarId + "/" + cardId + "/pull-template/" + tempId,
        method: "POST"
      }
      this.serviceHandler.runService(reqeustOptions.url, reqeustOptions.method, this.myData.token).subscribe(response => {
        console.log(response);
        if (response.done) {
          resolve(true);
        }
        else {
          reject(new Error("Failed to remove card!"));
        }
      }, error => {
        reject(error);
      });
    });
  }
  async publishCard(pillarId: string, cardId: string, isPublic: boolean) {
    return new Promise<boolean>((resolve, reject) => {
      const action = isPublic ? "/set-private" : "/set-public";
      const url = Constants.BASE_URL + "section/" + pillarId + "/" + cardId + action;
      this.serviceHandler.runService(url, "POST", this.myData.token).subscribe((res) => {
        console.log("Modify card status response");
        console.log(res);
        if (res.done) {
          resolve(true);
        }
        else {
          reject("Failure");
        }
      }, err => {
        console.log("Modify pillar status error");
        console.error(err);
        reject(err);
      });
    });
  }

}
