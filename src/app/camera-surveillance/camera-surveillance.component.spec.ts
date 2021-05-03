import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraSurveillanceComponent } from './camera-surveillance.component';

describe('CameraSurveillanceComponent', () => {
  let component: CameraSurveillanceComponent;
  let fixture: ComponentFixture<CameraSurveillanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraSurveillanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraSurveillanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
