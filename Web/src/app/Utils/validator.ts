import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidatorService } from 'angular-iban';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  static between(controlName: string):ValidatorFn{
    return (controls:AbstractControl) => {
        const amount = controls.get(controlName)
        if(amount?.value >20000000 || amount?.value <50){
            controls.get(controlName)?.setErrors({matching : true})
            return { matching: true}
        } else {
            return null
        }
    }
  }
  
  static dateFormat(controlName: string): ValidatorFn{
    return (controls:AbstractControl) => {
        const currentDate =  new Date()
        let date = new Date()
        if(controls.get(controlName).value.day){
            date.setDate(controls.get(controlName).value.day)
            date.setMonth(controls.get(controlName).value.month-1)
            date.setFullYear(controls.get(controlName).value.year)
            if (date.toISOString() > currentDate.toISOString()){
                
                controls.get(controlName)?.setErrors({error: true})
                return {error: true}
            }
        return null
        }
        controls.get(controlName)?.setErrors({error: true})
        return {error: true}
        
        
    }
  }

  static iban() : ValidatorFn {
    return (controls: AbstractControl) =>{
        if (controls.value){
            console.log('aaaaaaa')
            console.log(ValidatorService.validateIban(controls))
            return ValidatorService.validateIban(controls)
        }
        return null
    }
  }
}