import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Temp6popupComponent } from './temp6popup.component';

describe('Temp6popupComponent', () => {
  let component: Temp6popupComponent;
  let fixture: ComponentFixture<Temp6popupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Temp6popupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Temp6popupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
