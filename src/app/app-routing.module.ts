import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ChildCardComponent } from './pages/child-card/child-card.component';
import { LoginComponent } from './pages/login/login.component';
import { Temp1Component } from './pages/temp1/temp1.component';
import { Temp2Component } from './pages/temp2/temp2.component';
import { Temp3Component } from './pages/temp3/temp3.component';
import { Temp4Component } from './pages/temp4/temp4.component';
import { Temp5Component } from './pages/temp5/temp5.component';
import { Temp6Component } from './pages/temp6/temp6.component';
import { Temp9Component } from './pages/temp9/temp9.component';
import { Temp10Component } from './pages/temp10/temp10.component';
import { Temp11Component } from './pages/temp11/temp11.component';
import { Temp12Component } from './pages/temp12/temp12.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'Cards', component: ChildCardComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'temp1', component: Temp1Component },
  { path: 'temp2', component: Temp2Component },
  { path: 'temp3', component: Temp3Component },
  { path: 'temp4', component: Temp4Component },
  { path: 'temp5', component: Temp5Component },
  { path: 'temp6', component: Temp6Component },
  { path: 'temp9', component: Temp9Component },
  { path: 'temp10', component: Temp10Component },
  { path: 'temp11', component: Temp11Component },
  { path: 'temp12', component: Temp12Component }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
