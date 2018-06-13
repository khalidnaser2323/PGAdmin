import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Temp12popupComponent } from './temp12popup.component';

describe('Temp12popupComponent', () => {
  let component: Temp12popupComponent;
  let fixture: ComponentFixture<Temp12popupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Temp12popupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Temp12popupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
