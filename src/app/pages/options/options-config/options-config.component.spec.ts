import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsConfigComponent } from './options-config.component';

describe('OptionsConfigComponent', () => {
  let component: OptionsConfigComponent;
  let fixture: ComponentFixture<OptionsConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
