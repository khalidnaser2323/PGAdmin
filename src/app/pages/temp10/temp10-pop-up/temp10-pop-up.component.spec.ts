import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Temp10PopUpComponent } from './temp10-pop-up.component';

describe('Temp10PopUpComponent', () => {
  let component: Temp10PopUpComponent;
  let fixture: ComponentFixture<Temp10PopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Temp10PopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Temp10PopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
