import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeConfigComponent } from './ie-config.component';

describe('IeConfigComponent', () => {
  let component: IeConfigComponent;
  let fixture: ComponentFixture<IeConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
