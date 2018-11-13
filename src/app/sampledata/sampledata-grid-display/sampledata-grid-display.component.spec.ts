import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampledataGridDisplayComponent } from './sampledata-grid-display.component';

describe('SampledataGridDisplayComponent', () => {
  let component: SampledataGridDisplayComponent;
  let fixture: ComponentFixture<SampledataGridDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampledataGridDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampledataGridDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
