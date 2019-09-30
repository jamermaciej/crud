import { FormGroup, ValidationErrors } from '@angular/forms';

export class OneRequiredValidator {
  static validateOneRequired(group: FormGroup): ValidationErrors | null {
    const fields = [];
    for (const field of Object.keys(group.controls)) {
      fields.push(group.controls[field]);
    }
    if (!fields.some(control => control.value && control.value !== '')) {
      return {
        oneRequired: true
      };
    }
    return null;
  }
}