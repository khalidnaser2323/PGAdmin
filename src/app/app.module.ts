import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ChildCardComponent } from './pages/child-card/child-card.component';
import { CardDataComponent } from './pages/child-card/card-data/card-data.component';
import { TemplateDataComponent } from './pages/child-card/template-data/template-data.component';
import { ViewCardsComponent } from './pages/child-card/view-cards/view-cards.component';
import { LoginComponent } from './pages/login/login.component';
import { AddEditPillarPopupComponent } from './components/add-edit-pillar-popup/add-edit-pillar-popup.component';
// +import { SweetAlertService } from 'angular-sweetalert-service';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ChildCardComponent,
    CardDataComponent,
    TemplateDataComponent,
    ViewCardsComponent,
<<<<<<< HEAD
    LoginComponent
=======
    LoginComponent,
    AddEditPillarPopupComponent
>>>>>>> fc45f7ff4495a2711165d08d53dcdb30fad816eb
  ],

  providers: [
    // SweetAlertService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
