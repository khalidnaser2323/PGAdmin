import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Temp11Component } from './temp11.component';

describe('Temp11Component', () => {
  let component: Temp11Component;
  let fixture: ComponentFixture<Temp11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Temp11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Temp11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
