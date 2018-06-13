import { Component, OnInit } from '@angular/core';
import { ServiceHandlerProvider } from '../../services/service-handler/service-handler';
import { Constants } from '../../Constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public serviceHandler: ServiceHandlerProvider
  ) {

  }

  ngOnInit() {
  }
  login() {
    let temRequest = {
      "user": "admin",
      "password": "password"
    }
    this.serviceHandler.runService(Constants.BASE_URL + " /user/authenticate", "POST", null, temRequest).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })

  }
}
