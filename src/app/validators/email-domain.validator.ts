import { FormControl, ValidationErrors } from '@angular/forms';

export class EmailDomainValidator {
    // static validateEmailDomain(control: FormControl): {[key: string]: boolean} | null {
    //     const email = control.value;
    //     const domain = email.substring(email.lastIndexOf('@') + 1);
    //     if (domain.toLowerCase() !== 'gmail.com') {
    //         return { 'emailDomain': true };
    //     }
    //     return null;
    // }
    static validateEmailDomain(domainName: string) {
        return (control: FormControl): { [key: string]: boolean } | null => {
            const email = control.value;
            const domain = email.substring(email.lastIndexOf('@') + 1);
            if (domain.toLowerCase() !== domainName.toLowerCase()) {
                return { 'emailDomain': true };
            }
            return null;
        }
    }
}
