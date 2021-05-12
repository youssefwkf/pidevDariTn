import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSurveillanceComponent } from './gestion-surveillance.component';

describe('GestionSurveillanceComponent', () => {
  let component: GestionSurveillanceComponent;
  let fixture: ComponentFixture<GestionSurveillanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionSurveillanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSurveillanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
