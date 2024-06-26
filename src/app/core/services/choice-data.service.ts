import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { CarModelChoice, CarOptionChoice } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ChoiceDataService {
  private initialcarModelChoiceValue: CarModelChoice = { code: '', description: '', color: {} };
  private initialcarOptionChoiceValue: CarOptionChoice = { config: {}, towHitch: false, yoke: false };
  private carModelChoice: WritableSignal<CarModelChoice> = signal<CarModelChoice>(this.initialcarModelChoiceValue);
  private carOptionChoice: WritableSignal<CarOptionChoice> = signal<CarOptionChoice>(this.initialcarOptionChoiceValue);

  private modelAndColorAreSelected: Signal<boolean> = computed(
    () => this.carModelChoice()?.code !== '' && (this.carModelChoice()?.color.code ?? '') !== ''
  );
  private configIsSelected: Signal<boolean> = computed(() => (this.carOptionChoice()?.config.id ?? 0) !== 0);

  public totalPrice: Signal<number> = computed(() => {
    let total = (this.carModelChoice().color.price ?? 0) + (this.carOptionChoice().config.price ?? 0);

    if (this.carOptionChoice().towHitch) total += 1000;
    if (this.carOptionChoice().yoke) total += 1000;

    return total;
  });

  public firstStepCompleted(): Signal<boolean> {
    return this.modelAndColorAreSelected;
  }

  public secondStepCompleted(): Signal<boolean> {
    return this.configIsSelected;
  }

  public saveCarModel(data: CarModelChoice): void {
    if (this.carModelChoice().code !== data.code && this.carOptionChoice() !== this.initialcarOptionChoiceValue) {
      this.saveCarOption(this.initialcarOptionChoiceValue);
    }
    this.carModelChoice.set(data);
  }

  public saveCarOption(data: CarOptionChoice): void {
    this.carOptionChoice.set(data);
  }

  public getCarModel(): Signal<CarModelChoice> {
    return this.carModelChoice;
  }

  public getCarOption(): Signal<CarOptionChoice> {
    return this.carOptionChoice;
  }

  public resetCarModel(): void {
    this.carModelChoice.set(this.initialcarModelChoiceValue);
  }
}
