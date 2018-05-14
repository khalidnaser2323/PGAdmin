import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ChildCardComponent } from './pages/child-card/child-card.component';
import { LoginComponent } from './pages/login/login.component';
import { AddEditPillarPopupComponent } from './components/add-edit-pillar-popup/add-edit-pillar-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ChildCardComponent,
    LoginComponent,
    AddEditPillarPopupComponent
  ],
  imports: [
    BrowserModule,
    SweetAlert2Module.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
