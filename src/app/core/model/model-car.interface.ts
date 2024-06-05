import { ColorCar } from './color-car.interface';

export interface ModelCar {
  code: string;
  description: string;
  colors: Array<ColorCar>;
}
