import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ChildCardComponent } from './pages/child-card/child-card.component';
import { CardDataComponent } from './pages/child-card/card-data/card-data.component';
import { TemplateDataComponent } from './pages/child-card/template-data/template-data.component';
import { ViewCardsComponent } from './pages/child-card/view-cards/view-cards.component';
import { SweetAlertService } from 'angular-sweetalert-service';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ChildCardComponent,
    CardDataComponent,
    TemplateDataComponent,
    ViewCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    SweetAlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
