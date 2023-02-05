import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form.component';
import { FormService } from './form.service';

import { FormInputModule } from './form-input/form-input.module';
import { FormCheckboxModule } from './form-checkbox/form-checkbox.module';
import { FormDatepickerModule } from './form-datepicker/form-datepicker.module';
import { FormRadioButtonModule } from './form-radio-button/form-radio-button.module';
import { FormSelectBoxModule } from './form-select-box/form-select-box.module';

import { MaterialModule } from '../../styles/material.module';

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    
    MaterialModule,

    FormCheckboxModule,
    FormDatepickerModule,
    FormInputModule,
    FormRadioButtonModule,
    FormSelectBoxModule
  ],
  exports: [FormComponent],
  providers: [FormService]
})
export class FormModule { }
