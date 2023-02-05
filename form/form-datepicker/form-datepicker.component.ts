import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IInputType, ISelectTypes } from '../../../models/frontend/input.model';
import moment from 'moment';

@Component({
  selector: 'lib-form-datepicker',
  templateUrl: './form-datepicker.component.html',
  styleUrls: ['./form-datepicker.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormDatepickerComponent),
      multi: true
    }
  ]
})
export class FormDatepickerComponent implements ControlValueAccessor {

  @Input() config: IInputType;
  @Input() disable: boolean;
  value: Date | string | number | string[] | ISelectTypes[];
  
  onChange = (_:any) =>{ let value = {} };
  onTouch = () => { let value = {} };

  onChangeEvent(event: any) {
    this.value =  moment( moment(event.value).utc().format( "YYYY-MM-DD HH:mm:ss" )).toDate();
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
