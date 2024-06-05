import { Injectable, Signal, computed, signal } from '@angular/core';
import { CarModelChoice, CarOptionChoice } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ChoiceDataService {
  private carModelChoice = signal<CarModelChoice>({ code: '', description: '', color: {} });
  private carOptionChoice = signal<CarOptionChoice>({ config: {}, towHitch: false, yoke: false });

  private modelAndColorAreSelected = computed(() => this.carModelChoice()?.code !== '' && ((this.carModelChoice()?.color.code ?? '') !== ''));
  private configIsSelected = computed(() => (this.carOptionChoice()?.config.id ?? 0) !== 0);

  public totalPrice = computed(() =>{
    let total = (this.carModelChoice().color.price ?? 0) + (this.carOptionChoice().config.price ?? 0);

    if(this.carOptionChoice().towHitch) total += 1000;
    if(this.carOptionChoice().yoke) total += 1000;
    
    return total;
  })

  public firstStepCompleted(): Signal<boolean> {
    return this.modelAndColorAreSelected;
  }

  public secondStepCompleted(): Signal<boolean> {
    return this.configIsSelected;
  }

  public saveCarModel(data: CarModelChoice): void {
    this.carModelChoice.set(data);
  }

  public saveCarOption(data: CarOptionChoice): void {
    this.carOptionChoice.set(data);
  }

  public getCarModel(): Signal<CarModelChoice | null> {
    return this.carModelChoice;
  }

  public getCarOption(): Signal<CarOptionChoice | null> {
    return this.carOptionChoice;
  }
}
