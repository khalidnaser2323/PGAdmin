import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ServiceHandlerProvider } from '../../services/service-handler/service-handler';
import { Constants } from '../../Constants';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('errorDialog') private errorDialog: SwalComponent;
  loginFormObject: any = {};
  dialogOptions: SweetAlertOptions;
  constructor(
    public serviceHandler: ServiceHandlerProvider,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private router: Router
  ) {

  }

  ngOnInit() {
  }
  login(loginForm: any) {
    if (loginForm.valid) {
      console.log("Submitted login form");
      console.log(loginForm.value);
      this.serviceHandler.runService(Constants.BASE_URL + "/user/authenticate", "POST", null, loginForm.value).subscribe((response: LoginResponse) => {
        console.log(response);
        this.storage.set(Constants.USER_DATA, response);
        this.router.navigateByUrl("home");
      }, error => {
        console.log(error);
        this.showErrorDialog();
      })
    }
  }
  showErrorDialog() {
    this.dialogOptions = {
      title: "Error",
      text: "User name or password is incorrect",
      type: "error"
    }
    this.errorDialog.options = this.dialogOptions;
    this.errorDialog.show();

  }
}
