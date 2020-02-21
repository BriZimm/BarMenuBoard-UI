import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccasionConfigurationComponent } from './occasion-configuration.component';

describe('OccasionConfigurationComponent', () => {
  let component: OccasionConfigurationComponent;
  let fixture: ComponentFixture<OccasionConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccasionConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccasionConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
