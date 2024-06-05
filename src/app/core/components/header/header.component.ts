import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChoiceDataService } from '../../services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private choiceDataService = inject(ChoiceDataService);
  public firstStepCompleted = this.choiceDataService.firstStepCompleted();
  public secondStepCompleted = this.choiceDataService.secondStepCompleted();
}
