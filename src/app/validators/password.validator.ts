import { FormControl, ValidationErrors } from '@angular/forms';

export class PasswordValidator {
    static validatePassword(control: FormControl): {[key: string]: boolean} | null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        if (password.pristine || confirmPassword.pristine) {
            return null;
        }
        return password && confirmPassword && password.value !== confirmPassword.value ?
            { 'passwordMismatch': true } :
            null;
    }
}
