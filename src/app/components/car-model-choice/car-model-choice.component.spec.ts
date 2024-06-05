import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarModelChoiceComponent } from './car-model-choice.component';

describe('CarModelChoiceComponent', () => {
  let component: CarModelChoiceComponent;
  let fixture: ComponentFixture<CarModelChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarModelChoiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarModelChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
