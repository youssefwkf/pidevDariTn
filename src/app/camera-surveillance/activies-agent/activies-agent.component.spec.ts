import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviesAgentComponent } from './activies-agent.component';

describe('ActiviesAgentComponent', () => {
  let component: ActiviesAgentComponent;
  let fixture: ComponentFixture<ActiviesAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiviesAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviesAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
