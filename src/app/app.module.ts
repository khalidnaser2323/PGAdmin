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
import { CardService } from './services/card.service';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { Temp1Component } from './pages/temp1/temp1.component';
import { Temp2Component } from './pages/temp2/temp2.component';
import { Temp3Component } from './pages/temp3/temp3.component';
import { Temp4Component } from './pages/temp4/temp4.component';
import { Temp5Component } from './pages/temp5/temp5.component';
import { Temp6Component } from './pages/temp6/temp6.component';
import { Temp7Component } from './pages/temp7/temp7.component';
import { Temp9Component } from './pages/temp9/temp9.component';
import { Temp10Component } from './pages/temp10/temp10.component';
import { Temp11Component } from './pages/temp11/temp11.component';
import { Temp12Component } from './pages/temp12/temp12.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ChildCardComponent,
    CardDataComponent,
    TemplateDataComponent,
    ViewCardsComponent,
    LoginComponent,
    AddEditPillarPopupComponent,
    Temp1Component,
    Temp2Component,
    Temp3Component,
    Temp4Component,
    Temp5Component,
    Temp6Component,
    Temp7Component,
    Temp9Component,
    Temp10Component,
    Temp11Component,
    Temp12Component
  ],

  providers: [
    
    CardService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpModule,
    DropzoneModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
