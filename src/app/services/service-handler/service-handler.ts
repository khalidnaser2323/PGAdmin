import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ServiceHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceHandlerProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ServiceHandlerProvider Provider');
  }
  /**
   * Created by K.A.
   * App services handler, takes service parameters and returns http observable
   * @param url service url
   * @param method service method e.g. "GET" & "POST"
   * @param token user's token to be authorized for excecuting service, if null noting will be sent
   * @param request request body.
   * @param specialHeaders Special headers if needed.
   */
  runService(url: string, method: string, token?: string, request?: any, specialHeaders?: any): Observable<any> {
    let headers: any;

    if (specialHeaders) {
      headers = specialHeaders;
    }
    else {
      headers = {
        "Content-Type": "application/json"
      }
      if (token) {
        headers.Authorization = "Bearer " + token;
      }
    }
    let requestOptions = {
      body: request,
      headers: headers
    }
    return this.http.request(method, url, requestOptions);

  }
}
