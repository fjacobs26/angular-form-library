import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IInputType, ISelectTypes } from '../../../models/frontend/input.model';

@Component({
  selector: 'lib-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true
    }
  ]
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() config: IInputType;
  @Input() disable: boolean;
  value: string | number | string[] | ISelectTypes[];
  
  onChange = (_:any) =>{ let value = {} };
  onTouch = () => { let value = {} };

  onInput(value: any) {
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    if(typeof value !== 'function'){
      const { subValues = undefined } = this.config;
      if (subValues) {
        this.value = subValues;
        return;
      }
    }
    this.value = ''|| null;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
