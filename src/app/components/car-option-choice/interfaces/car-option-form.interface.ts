import { FormGroup } from '@angular/forms';

export interface CarOptionFormGroup {
  config: FormGroup<number>;
  towHitch: FormGroup<boolean>;
  yoke: FormGroup<boolean>;
}
