import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickOptionsComponent } from './pick-options.component';

describe('PickOptionsComponent', () => {
  let component: PickOptionsComponent;
  let fixture: ComponentFixture<PickOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
