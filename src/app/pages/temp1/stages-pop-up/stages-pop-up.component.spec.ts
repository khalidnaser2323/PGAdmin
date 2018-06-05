import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesPopUpComponent } from './stages-pop-up.component';

describe('StagesPopUpComponent', () => {
  let component: StagesPopUpComponent;
  let fixture: ComponentFixture<StagesPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagesPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagesPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
