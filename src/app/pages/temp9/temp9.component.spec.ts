import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Temp9Component } from './temp9.component';

describe('Temp9Component', () => {
  let component: Temp9Component;
  let fixture: ComponentFixture<Temp9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Temp9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Temp9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
