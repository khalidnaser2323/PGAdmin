import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPopUpComponent } from './team-pop-up.component';

describe('TeamPopUpComponent', () => {
  let component: TeamPopUpComponent;
  let fixture: ComponentFixture<TeamPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
