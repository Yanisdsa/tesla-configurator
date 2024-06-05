import { FormGroup } from '@angular/forms';

export interface CarModelFormGroup {
  model: FormGroup<string>;
  color: FormGroup<string>;
}
