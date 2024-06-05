import { OptionCar } from './option-car.interface';

export interface ConfigCar {
  configs: Array<OptionCar>;
  towHitch: boolean;
  yoke: boolean;
}
