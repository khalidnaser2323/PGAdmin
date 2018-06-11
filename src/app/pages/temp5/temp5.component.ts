import { Component, OnInit, ViewChild,Input, Output,EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Temp5PopUpcomponentComponent } from './temp5-pop-upcomponent/temp5-pop-upcomponent.component';
import { Popup5Component } from './popup5/popup5.component'

import {NgForm} from '@angular/forms'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-temp5',
  templateUrl: './temp5.component.html',
  styleUrls: ['./temp5.component.css'],
  providers:[]
})
export class Temp5Component implements OnInit {
 
 // @ViewChild('f') ChartForm:NgForm;
  ChartValues:template5 = {
    label1:"",
      label2:"",
  xaxisValues:"",
  y1Values:"",
  y2Values:"",
  }; 
  titleValues:title ={
    tempName:"",
    tempDescribtion:"",
  };
 // @Output()chartV = new EventEmitter<template5>();
 temp:template5;
 
  constructor( public dialog: MatDialog) {
    //this.data.currentData.subscribe(values=>this.ChartValues=values);
     }

  
  ngOnInit() {
    console.log('oninit');
    console.log(this.ChartValues);  
    //this.chartV.emit(this.ChartValues);
    }
   onsaveTitle()
   {
     console.log('name&descriptio');
     console.log(this.titleValues);
   } 
   onSaveChartData()
   {
     console.log("chartData");
     console.log(this.ChartValues);
   }
  
  openDialog(): void {
    let dialogRef = this.dialog.open(Popup5Component, {
      height: '400px',
      width: '600px',
      data: {ChartValues: this.ChartValues }
    });
  }
}
