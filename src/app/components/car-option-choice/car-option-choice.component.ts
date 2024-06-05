import { Component, OnInit, Signal, computed, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  AppConstants,
  CarModelChoice,
  CarOptionChoice,
  ChoiceDataService,
  ConfigCar,
  OptionCar,
  TeslaDatabaseService,
} from '../../core';
import { CarOptionFormGroup } from './interfaces';

@Component({
  selector: 'app-car-option-choice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './car-option-choice.component.html',
  styleUrl: './car-option-choice.component.scss',
})
export class CarOptionChoiceComponent implements OnInit {
  private readonly teslaDatabase: TeslaDatabaseService = inject(TeslaDatabaseService);
  private readonly choiceDataService: ChoiceDataService = inject(ChoiceDataService);
  private readonly fb: FormBuilder = inject(FormBuilder);
  public form!: FormGroup<CarOptionFormGroup>;

  private carModel: Signal<CarModelChoice> = this.choiceDataService.getCarModel();
  private carOption: Signal<CarOptionChoice> = this.choiceDataService.getCarOption();
  public options: Signal<ConfigCar> = this.teslaDatabase.getOptions(this.carModel()?.code ?? '');
  public configList: Signal<Array<OptionCar>> = computed(() => this.options().configs);
  public configSelected: Signal<OptionCar> = computed(() => this.carOption().config);
  public isCompleted: Signal<boolean> = this.choiceDataService.secondStepCompleted();

  ngOnInit(): void {
    this.form = this.fb.group({
      config: [this.carOption()?.config.id ?? 0],
      towHitch: [this.carOption()?.towHitch ?? false],
      yoke: [this.carOption()?.yoke ?? false],
    }) as FormGroup;

    this.form.valueChanges.subscribe((formValue) => {
      const configSelected = this.configList().find((config) => config.id === Number(formValue.config));
      this.choiceDataService.saveCarOption({ ...formValue, config: configSelected ?? {} } as CarOptionChoice);
    });
  }

  get imagePath(): string {
    const carModel: Signal<CarModelChoice> = this.choiceDataService.getCarModel();
    return AppConstants.IMAGES_URL + `${carModel()?.code}/${carModel()?.color.code}.jpg`;
  }
}
