import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Temp12Component } from './temp12.component';

describe('Temp12Component', () => {
  let component: Temp12Component;
  let fixture: ComponentFixture<Temp12Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Temp12Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Temp12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
