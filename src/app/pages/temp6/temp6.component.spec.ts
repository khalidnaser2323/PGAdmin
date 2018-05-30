import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Temp6Component } from './temp6.component';

describe('Temp6Component', () => {
  let component: Temp6Component;
  let fixture: ComponentFixture<Temp6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Temp6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Temp6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
