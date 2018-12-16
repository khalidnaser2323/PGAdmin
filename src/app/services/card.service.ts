import { Injectable, Inject } from '@angular/core';
import { ServiceHandlerProvider } from './service-handler/service-handler';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../Constants';

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
      //Create template first
      const reqeustOptions: any = {
        url: Constants.BASE_URL + "section/" + pillarId + "/" + cardId + "/push-template/" + buttonId,
        method: "POST",
        requestBody: {
          title: name
        }
      }
      this.serviceHandler.runService(reqeustOptions.url, reqeustOptions.method, this.myData.token, reqeustOptions.requestBody).subscribe(response => {
        console.log(response);
        if (response.done) {
          //After creating template, put template type
          const reqeustOptions: any = {
            url: Constants.BASE_URL + "section/" + pillarId + "/" + cardId + "/" + buttonId,
            method: "PUT",
            requestBody: {
              payload: {
                templateType: templateType
              }
            }
          }
          this.serviceHandler.runService(reqeustOptions.url, reqeustOptions.method, this.myData.token, reqeustOptions.requestBody).subscribe(res => {
            if (res.done) {
              resolve(res.done);
            } else {
              reject("Failure!");
            }
          }, err => {
            reject(err)
          });

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
  async getCardDetails(pillarId: string, cardId: string) {
    return new Promise<any>((resolve, reject) => {
      const url = Constants.BASE_URL + "section/" + pillarId + "/" + cardId;
      this.serviceHandler.runService(url, "GET", this.myData.token).subscribe((res) => {
        console.log("Get card details response");
        console.log(res);
        resolve(res);
      }, err => {
        console.log("Get card details error");
        console.error(err);
        reject(err);
      });
    });
  }
  updateTemplatePayload(pillarId: string, cardId: string, templateId: string, payload: any, isBeingUsedNow?: boolean) {
    return new Promise<boolean>((resolve, reject) => {
      payload.isBeingUsedNow = isBeingUsedNow ? true : false;
      console.log("Final template payload");
      console.log(payload);
      const reqeustOptions: any = {
        url: Constants.BASE_URL + "section/" + pillarId + "/" + cardId + "/" + templateId,
        method: "PUT",
        requestBody: {
          payload: payload
        }
      }
      this.serviceHandler.runService(reqeustOptions.url, reqeustOptions.method, this.myData.token, reqeustOptions.requestBody).subscribe(res => {
        console.log("Update payload response");
        console.log(res);
        if (res.done) {
          resolve(res.done);
        } else {
          reject("Failure!");
        }
      }, err => {
        reject(err)
      });
    });
  }
  updateTemplateTitle(pillarId: string, cardId: string, templateId: string, title: string) {
    return new Promise<boolean>((resolve, reject) => {
      const reqeustOptions: any = {
        url: Constants.BASE_URL + "section/" + pillarId + "/" + cardId + "/" + templateId,
        method: "PUT",
        requestBody: {
          title: title
        }
      }
      this.serviceHandler.runService(reqeustOptions.url, reqeustOptions.method, this.myData.token, reqeustOptions.requestBody).subscribe(res => {
        console.log("Update template title response");
        console.log(res);
        if (res.done) {
          resolve(res.done);
        } else {
          reject("Failure!");
        }
      }, err => {
        reject(err)
      });
    });
  }
  uploadImage(imageString: string) {
    return new Promise<string>((resolve, reject) => {
      const reqeustOptions: any = {
        url: Constants.BASE_URL + "image",
        method: "POST",
        requestBody: {
          data: imageString
        }
      }

      this.serviceHandler.runService(reqeustOptions.url, reqeustOptions.method, this.myData.token, reqeustOptions.requestBody).subscribe(res => {

        console.log("Upload image response");
        console.log(res);
        if (res.id) {
          resolve(res.id);
        } else {
          reject("Failure!");
        }
      }, err => {

        reject(err)
      });
    });
  }

}
