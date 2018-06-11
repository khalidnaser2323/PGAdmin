import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Temp5PopUpcomponentComponent } from './temp5-pop-upcomponent.component';

describe('Temp5PopUpcomponentComponent', () => {
  let component: Temp5PopUpcomponentComponent;
  let fixture: ComponentFixture<Temp5PopUpcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Temp5PopUpcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Temp5PopUpcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
