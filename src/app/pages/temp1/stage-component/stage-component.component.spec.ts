import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageComponentComponent } from './stage-component.component';

describe('StageComponentComponent', () => {
  let component: StageComponentComponent;
  let fixture: ComponentFixture<StageComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
