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
import { StageComponentComponent } from './pages/temp1/stage-component/stage-component.component';
import { StagesPopUpComponent } from './pages/temp1/stages-pop-up/stages-pop-up.component';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Temp5PopUpcomponentComponent } from './pages/temp5/temp5-pop-upcomponent/temp5-pop-upcomponent.component';
import { Popup5Component } from './pages/temp5/popup5/popup5.component';
import { Temp6popupComponent } from './pages/temp6/temp6popup/temp6popup.component';
import { ConpopupComponent } from './pages/temp6/conpopup/conpopup.component';
import { TablePopUpComponent } from './pages/temp2/table-pop-up/table-pop-up.component';
import { TeamPopUpComponent } from './pages/temp3/team-pop-up/team-pop-up.component';


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
    Temp12Component,
    StageComponentComponent,
    StagesPopUpComponent,
    Temp5PopUpcomponentComponent,
    Popup5Component,
    Temp6popupComponent,
    ConpopupComponent
  ],
  entryComponents: [
    Temp6popupComponent,
    Popup5Component,
    Temp5PopUpcomponentComponent,
    ConpopupComponent,
    TablePopUpComponent,
    TeamPopUpComponent,
    StagesPopUpComponent,
    TablePopUpComponent,
    TeamPopUpComponent
  ],
  

  providers: [
    
    CardService,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    HttpModule,
    DropzoneModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
