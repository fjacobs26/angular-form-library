import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IInputType, ISelectTypes } from '../../../models/frontend/input.model';

@Component({
  selector: 'lib-form-select-box',
  templateUrl: './form-select-box.component.html',
  styleUrls: ['./form-select-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormSelectBoxComponent),
      multi: true
    }
  ]
})
export class FormSelectBoxComponent implements ControlValueAccessor {
  @Input() disable: boolean;
  @Input() config: IInputType;
  @Output() changeValidatorDeps = new EventEmitter();

  value: string | number | string[] | ISelectTypes[];

  onChange = (_:any) =>{ let value = {} };
  onTouch = () => { let value = {} };

  onChangeEvent(value: string) {
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
    const { deps: { master = undefined } = {} } = this.config;
    if (master) {
      this.changeValidatorDeps.emit({masterFormName: this.config.formName, changeValidator: master.config.find(confVal => confVal.case === value)});
    }
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
