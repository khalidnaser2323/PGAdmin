import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPillarPopupComponent } from './add-edit-pillar-popup.component';

describe('AddEditPillarPopupComponent', () => {
  let component: AddEditPillarPopupComponent;
  let fixture: ComponentFixture<AddEditPillarPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditPillarPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPillarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
