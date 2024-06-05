import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConstants, CarModelChoice, CarOptionChoice, ChoiceDataService } from '../../core';

@Component({
  selector: 'app-total-cost',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total-cost.component.html',
  styleUrl: './total-cost.component.scss',
})
export class TotalCostComponent {
  private readonly choiceDataService: ChoiceDataService = inject(ChoiceDataService);
  public carModel: Signal<CarModelChoice> = this.choiceDataService.getCarModel();
  public carOption: Signal<CarOptionChoice> = this.choiceDataService.getCarOption();
  public totalPrice: Signal<number> = this.choiceDataService.totalPrice;

  get imagePath(): string {
    const carModel: Signal<CarModelChoice> = this.choiceDataService.getCarModel();
    return AppConstants.IMAGES_URL + `${carModel()?.code}/${carModel()?.color.code}.jpg`;
  }
}
