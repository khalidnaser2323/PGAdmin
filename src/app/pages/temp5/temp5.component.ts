import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms'
@Component({
  selector: 'app-temp5',
  templateUrl: './temp5.component.html',
  styleUrls: ['./temp5.component.css']
})
export class Temp5Component implements OnInit {
  @ViewChild('f') ChartForm:NgForm;
  constructor() { }

  ngOnInit() {
    console.log('oninit');
  
  }

  ChartSubmit(form:NgForm)
  {
    console.log(form);
  }

}
