import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigOrderComponent } from './config-order.component';

describe('ConfigOrderComponent', () => {
  let component: ConfigOrderComponent;
  let fixture: ComponentFixture<ConfigOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
