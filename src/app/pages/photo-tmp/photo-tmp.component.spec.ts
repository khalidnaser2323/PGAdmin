import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoTmpComponent } from './photo-tmp.component';

describe('PhotoTmpComponent', () => {
  let component: PhotoTmpComponent;
  let fixture: ComponentFixture<PhotoTmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoTmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoTmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
