import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import * as IBAN from 'iban';
import { ObjectForm } from '../../models/frontend/form.model';
@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private fb: FormBuilder
  ) { }

  createForm(formData: Array<Object>, object?: Array<ObjectForm>, readOnly?: boolean, editMode?: boolean): FormGroup {
    let formDataMap = new Map<string, FormControl>();
    let form: any = {};
    formData.forEach((element: any) => {
      const validators = this.addValidators(element);
      const dataObject: any = object?.find(obj => obj.id === element.id)
      formDataMap.set(
        element.id, 
        readOnly ? 
        new FormControl({ value: dataObject?.value, disabled: true }, validators) :
        this.buildFormControl(editMode, dataObject, validators, element.readOnly)
      );
    });
    formDataMap.forEach((value, key) => form[key] = value);
    return this.fb.group(form);
  }

  private buildFormControl(editMode: boolean, dataObject: any, validators: any[], isReadOnly: boolean): FormControl {
    if (dataObject?.value == undefined) { return new FormControl(null, validators); }

    if (isReadOnly || !editMode) {
      return new FormControl({ value: dataObject?.value, disabled: true }, validators);
    }
    if (editMode) {
      return new FormControl(dataObject?.value, validators);
    } 
    return new FormControl({ value: dataObject?.value, disabled: true }, validators);
  }

  private addValidators(element: any): Array<any> {
    let validators: any[] = [];

    if (element.customValidators?.length) {
      validators = validators.concat(element.customValidators);
    }

    this.addRequiredValidator(element, validators);
    this.addTypesValidator(element, validators);
    this.addPatternValidator(element.id, validators);
    
    return validators;
  }

  private addRequiredValidator(element: any, validators: any[]): void {
    if (element.required) {
      if (element.id?.includes('check_box')) {
        validators.push(Validators.requiredTrue);
      } else {
        validators.push(Validators.required);
      }
    }
  }

  private addTypesValidator(element: any, validators: any[]): void {
    if (element.maxLength) {
      validators.push(Validators.maxLength(element.maxLength));
    }
    if (element.minLength) {
      validators.push(Validators.minLength(element.minLength));
    }
    if (element.maxValue) {
      validators.push(Validators.min(element.maxValue));
    }
    if (element.minValue) {
      validators.push(Validators.min(element.minValue));
    }
  }

  private addPatternValidator(type: string, validators: any[]): void {
    const emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
    const phoneNumberPattern = '^[679]{1}[0-9]*$';
    if (type === 'email') {
      validators.push(Validators.pattern(emailPattern));
    }
    if (type === 'phoneNumber') {
      validators.push(Validators.pattern(phoneNumberPattern));
    }
  }

  validate(type: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let isValid;
      switch (type) {
        case 'document':
          isValid = this.validateDocument(control.value);
          return this.isValidFn(isValid, { invalidDocument: { value: control.value }})
        case 'age':
          isValid = this.validateAge(control.value);
          return this.isValidFn(isValid, { invalidAge: { value: control.value }});
        case 'iban':
          isValid = IBAN.isValid('ES'+control.value);
          return this.isValidFn(isValid, { invalidIban: { value: control.value }});
        case 'autocompleteAddress':
          isValid = typeof control.value !== 'string';
          return this.isValidFn(isValid, { invalidAutocompleteAddress: { value: control.value }});
        default:
          return null;
      }
    };
  }

  private isValidFn(isValid: boolean, obj: object): null | object {
    return isValid ? null : obj;
  }

  private validateAge(birthday: number): boolean {
    const ageDifMs = Date.now() - birthday;
    const date = new Date(ageDifMs);
    return Math.abs(date.getUTCFullYear() - 1970) >= 18;
  }

  private validateDocument(document?: string): boolean {
    let result = false;
    if(document){
      let cifPrefix: boolean = 'XYZ'.includes(document.toUpperCase().charAt(0));
      const dniRegex = /^[XYZ]?\d{5,8}[A-Z]$/;
      if (cifPrefix && dniRegex.test(document)) {
        result = this.validateNIE(document)
      } else if (dniRegex.test(document)) {
        result = this.validateDNI(document);
      }
    }
    return result;
  }

  private validateDNI(dni: string): boolean {
    const dniLetters = "TRWAGMYFPDXBNJZSQVHLCKE";
    const letter = dniLetters.charAt(parseInt(dni, 10) % 23);
    return letter == dni.charAt(8);
  }

  private validateNIE(nie: string): boolean {
    let niePrefix: string | number = nie.charAt( 0 );
    switch (niePrefix) {
      case 'X': niePrefix = 0; break;
      case 'Y': niePrefix = 1; break;
      case 'Z': niePrefix = 2; break;
    }
    return this.validateDNI( niePrefix + nie.substr(1) );
  }

  private calculateEvenAndOddsSums(num: string): [number, number] {
    let evenSum = 0;
    let oddSum = 0;
    let n: number;
    for (let i = 0; i < num.length; i++) {
      n = parseInt( num[i], 10 );
      if (i % 2 === 0) {
        n *= 2;
        oddSum += this.oddSum(n);
      } else {
        evenSum += n;
      } 
    }
    return [evenSum, oddSum];
  }

  private oddSum(n: number): number {
    return n < 10 ? n : n - 9;
  }

  mapDataForm(data: any): Array<ObjectForm> {
    let res = []
    for (const key in data) {
      res.push({
        id: key,
        value: data[key]
      });
    }
    return res;
  }

}