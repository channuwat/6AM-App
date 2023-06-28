import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodConfigComponent } from './food-config.component';

describe('FoodConfigComponent', () => {
  let component: FoodConfigComponent;
  let fixture: ComponentFixture<FoodConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
