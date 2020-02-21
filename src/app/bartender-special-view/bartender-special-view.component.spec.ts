import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BartenderSpecialViewComponent } from './bartender-special-view.component';

describe('BartenderSpecialViewComponent', () => {
  let component: BartenderSpecialViewComponent;
  let fixture: ComponentFixture<BartenderSpecialViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BartenderSpecialViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BartenderSpecialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
