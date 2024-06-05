import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOptionChoiceComponent } from './car-option-choice.component';

describe('CarOptionChoiceComponent', () => {
  let component: CarOptionChoiceComponent;
  let fixture: ComponentFixture<CarOptionChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOptionChoiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarOptionChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
