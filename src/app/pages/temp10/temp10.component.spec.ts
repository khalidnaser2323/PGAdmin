import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Temp10Component } from './temp10.component';

describe('Temp10Component', () => {
  let component: Temp10Component;
  let fixture: ComponentFixture<Temp10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Temp10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Temp10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
