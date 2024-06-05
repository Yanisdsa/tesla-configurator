import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConfigCar, ModelCar } from '../model';

@Injectable({
  providedIn: 'root',
})
export class TeslaDatabaseService {
  private readonly http: HttpClient = inject(HttpClient);

  public getModels(): Signal<ModelCar[]> {
    const modelCarObs$ = this.http.get<ModelCar[]>('/models');
    return toSignal(modelCarObs$, { initialValue: [] });
  }

  public getOptions(modelCode: string): Signal<ConfigCar> {
    const optionCarObs$ = this.http.get<ConfigCar>('/options/' + modelCode);
    return toSignal(optionCarObs$, { initialValue: { configs: [], towHitch: false, yoke: false } });
  }
}
