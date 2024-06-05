import { Component } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { HeaderComponent } from './core/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  name = 'Angular';
}
