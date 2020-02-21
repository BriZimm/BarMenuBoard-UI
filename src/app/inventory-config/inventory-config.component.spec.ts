import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryConfigComponent } from './inventory-config.component';

describe('InventoryConfigComponent', () => {
  let component: InventoryConfigComponent;
  let fixture: ComponentFixture<InventoryConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
