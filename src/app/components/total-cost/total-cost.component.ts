import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConstants, ChoiceDataService } from '../../core';

@Component({
  selector: 'app-total-cost',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total-cost.component.html',
  styleUrl: './total-cost.component.scss',
})
export class TotalCostComponent {
  private choiceDataService = inject(ChoiceDataService);
  public carModel = this.choiceDataService.getCarModel();
  public carOption = this.choiceDataService.getCarOption();
  public totalPrice = this.choiceDataService.totalPrice;

  get imagePath(): string {
    const carModel = this.choiceDataService.getCarModel();
    return AppConstants.IMAGES_URL + `${carModel()?.code}/${carModel()?.color.code}.jpg`;
  }
}
