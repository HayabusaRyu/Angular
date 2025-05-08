import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotatinLightComponent } from './rotatin-light.component';

describe('RotatinLightComponent', () => {
  let component: RotatinLightComponent;
  let fixture: ComponentFixture<RotatinLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RotatinLightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RotatinLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
