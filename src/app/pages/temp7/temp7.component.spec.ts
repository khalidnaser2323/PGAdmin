import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Temp7Component } from './temp7.component';

describe('Temp7Component', () => {
  let component: Temp7Component;
  let fixture: ComponentFixture<Temp7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Temp7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Temp7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
