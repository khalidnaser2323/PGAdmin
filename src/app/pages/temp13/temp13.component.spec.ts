import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Temp13Component } from './temp13.component';

describe('Temp13Component', () => {
  let component: Temp13Component;
  let fixture: ComponentFixture<Temp13Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Temp13Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Temp13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
