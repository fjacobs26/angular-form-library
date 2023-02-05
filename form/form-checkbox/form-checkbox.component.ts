import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IInputType, ISelectTypes } from '../../../models/frontend/input.model';
@Component({
  selector: 'lib-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormCheckboxComponent),
      multi: true
    }
  ]
})
export class FormCheckboxComponent implements ControlValueAccessor {
  @Input() config: IInputType;
  @Input() disable: boolean; 
  @Output() changeValidatorDeps = new EventEmitter();

  value: ISelectTypes[];
  
  onChange = (_:any) =>{ let value = {} };
  onTouch = () => { let value = {} };

  onClick(selected: ISelectTypes) {
    this.removeElement(selected);
    this.value.push(selected);
    this.onTouch();
    this.onChange(this.value);
  }

  removeElement(selected: ISelectTypes): void {
    let elementFound: ISelectTypes = this.value?.find(value => value == selected);
    if (elementFound === undefined) { return; }
    let indexOfElementFound = this.value.indexOf(elementFound, 0);
    if (elementFound && indexOfElementFound > 0 ) {
      this.value.splice(indexOfElementFound, 1);
    }
  }

  writeValue(value: any): void {
    if(typeof value !== 'function'){
      const { subValues = undefined } = this.config;
      if (subValues) {
        this.value = subValues as ISelectTypes[];
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
