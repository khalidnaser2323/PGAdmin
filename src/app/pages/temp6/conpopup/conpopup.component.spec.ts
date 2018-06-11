import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConpopupComponent } from './conpopup.component';

describe('ConpopupComponent', () => {
  let component: ConpopupComponent;
  let fixture: ComponentFixture<ConpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
