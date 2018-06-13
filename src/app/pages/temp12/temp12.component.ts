import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import{Temp12connComponent} from './temp12conn/temp12conn.component'
@Component({
  selector: 'app-temp12',
  templateUrl: './temp12.component.html',
  styleUrls: ['./temp12.component.css']
})
export class Temp12Component implements OnInit {
  ChartValues:template6={
    label:'',
    xaxisValues:'',
    yaxisValues:'',
  };
  tableData:any=[
    {rowID:'0',tableHeader1:['h1'],tableHeader2:['h2'],tableHeader3:['h3'],tableHeader4:['h4']
    ,tableHeader5:['h5'],tableHeader6:['h6'],tableHeader7:['h7']},
 {rowId: '1',value1:'value1',value2:'value2',value3:'value3'
 ,value4:'value4',value5:'value5',value6:'value6'
 ,value7:'value7',value8:'value8',value9:'value9'} ,
 {rowId: '2',value1:'value1',value2:'value2',value3:'value3'
 ,value4:'value4',value5:'value5',value6:'value6'
 ,value7:'value7',value8:'value8',value9:'value9' } ,
  {rowId: '3',value1:'value1',value2:'value2',value3:'value3'
  ,value4:'value4',value5:'value5',value6:'value6'
  ,value7:'value7',value8:'value8',value9:'value9'
  } 
  
  ];
  constructor(public dialog: MatDialog) { 
   }

  ngOnInit() {
    
  }
  saveTableData()
  {
    
    console.log(this.tableData);
  }
  onSaveChartData()
  {
    console.log("chartData");
    console.log(this.ChartValues);
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(Temp12connComponent, {
      height: '400px',
      width: '600px',
      data: {ChartValues: this.ChartValues }
    });
  }


}
