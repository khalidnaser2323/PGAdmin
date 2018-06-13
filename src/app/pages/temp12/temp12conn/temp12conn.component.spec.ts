import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Temp12connComponent } from './temp12conn.component';

describe('Temp12connComponent', () => {
  let component: Temp12connComponent;
  let fixture: ComponentFixture<Temp12connComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Temp12connComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Temp12connComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
