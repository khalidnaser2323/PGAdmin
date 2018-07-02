import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Temp10ChartComponent } from './temp10-chart.component';

describe('Temp10ChartComponent', () => {
  let component: Temp10ChartComponent;
  let fixture: ComponentFixture<Temp10ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Temp10ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Temp10ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
