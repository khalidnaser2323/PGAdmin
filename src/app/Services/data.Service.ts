import {Injectable} from '@angular/core';
import{BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class dataService
{
    private chartValues:template5=null;
  private chartData = new BehaviorSubject<template5>
    ({
     label1:'team direction',
    label2:'Established boundaries',
    xaxisValues:['2006','2007','2008','2009','2010','2011','2012'],
    y1Values:['40','50','120','40','70','60','50'],
    y2Values:['30','60','150','50','80','70','60']
    });
   
    currentData=this.chartData.asObservable();
    constructor()
    {

    }
    updateData(values:template5)
    {
        this.chartData.next(values);
    }
    addValues(temp:template5)
    {
        this.chartValues=temp;
    }
    returnChartData()
    {   
        
        return this.chartValues;
    }
}