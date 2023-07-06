import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOptionsFoodComponent } from './select-options-food.component';

describe('SelectOptionsFoodComponent', () => {
  let component: SelectOptionsFoodComponent;
  let fixture: ComponentFixture<SelectOptionsFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectOptionsFoodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectOptionsFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
