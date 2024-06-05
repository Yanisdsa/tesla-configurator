import { Component, OnInit, inject, computed } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppConstants, CarModelChoice, ChoiceDataService, TeslaDatabaseService } from '../../core';
import { CarModelFormGroup } from './interfaces';


@Component({
  selector: 'app-car-model-choice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './car-model-choice.component.html',
  styleUrl: './car-model-choice.component.scss',
})
export class CarModelChoiceComponent implements OnInit {
  private readonly teslaDatabase = inject(TeslaDatabaseService);
  private readonly choiceDataService = inject(ChoiceDataService);
  private readonly fb = inject(FormBuilder);

  public form!: FormGroup<CarModelFormGroup>;
  public isModelChoose: boolean = false;
  public carModelList = this.teslaDatabase.getModels();
  private carModelSelected = this.choiceDataService.getCarModel();
  public carModelIsSelected = computed(() => this.carModelSelected()?.code !== '');
  public firstStepCompleted = this.choiceDataService.firstStepCompleted();

  public colorList = computed(
    () => this.carModelList().find((model) => model.code === this.choiceDataService.getCarModel()()?.code)?.colors
  );

  ngOnInit(): void {
    this.form = this.fb.group({
      model: [this.carModelSelected()?.code ?? this.colorList()?.at(0)?.code],
      color: [this.carModelSelected()?.color.code ?? ''],
    }) as FormGroup;
    
    this.form.valueChanges.subscribe((formValue) => {
      const modelSelected = this.carModelList().find((carModel) => carModel.code === formValue.model);
      const colorSelected = modelSelected?.colors.find((color) => color.code === formValue.color);
      this.choiceDataService.saveCarModel({ ...modelSelected, color: colorSelected ?? {} } as CarModelChoice);
    });
  }

  get imagePath(): string {
    return AppConstants.IMAGES_URL + `${this.form.controls.model.value}/${this.form.controls.color.value}.jpg`;
  }
}
