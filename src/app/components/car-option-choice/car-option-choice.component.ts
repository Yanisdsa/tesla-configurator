import { Component, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppConstants, CarOptionChoice, ChoiceDataService, TeslaDatabaseService } from '../../core';
import { CarOptionFormGroup } from './interfaces';


@Component({
  selector: 'app-car-option-choice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './car-option-choice.component.html',
  styleUrl: './car-option-choice.component.scss',
})
export class CarOptionChoiceComponent implements OnInit {
  private readonly teslaDatabase = inject(TeslaDatabaseService);
  private readonly choiceDataService = inject(ChoiceDataService);
  private readonly fb = inject(FormBuilder);
  public form!: FormGroup<CarOptionFormGroup>;
  private carModel = this.choiceDataService.getCarModel();
  private carOption = this.choiceDataService.getCarOption();
  public options = this.teslaDatabase.getOptions(this.carModel()?.code ?? '');
  public configList = computed(() => this.options().configs);
  public configSelected = computed(() => this.carOption()?.config);
  public isCompleted = this.choiceDataService.secondStepCompleted();

  ngOnInit(): void {
    this.form = this.fb.group({
      config: [this.carOption()?.config.id ?? 0],
      towHitch: [this.carOption()?.towHitch ?? false],
      yoke: [this.carOption()?.yoke ?? false],
    }) as FormGroup;

    this.form.valueChanges.subscribe((formValue) => {
      const configSelected = this.configList().find((config) => config.id === Number(formValue.config));
      this.choiceDataService.saveCarOption({ ...formValue, config: configSelected ?? {}} as CarOptionChoice);
    });
  }

  get imagePath(): string {
    const carModel = this.choiceDataService.getCarModel();
    return AppConstants.IMAGES_URL + `${carModel()?.code}/${carModel()?.color.code}.jpg`;
  }
}
