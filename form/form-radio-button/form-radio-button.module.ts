import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRadioButtonComponent } from './form-radio-button.component';
import { MaterialModule } from '../../../styles/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from '../../radio-button/radio-button.module';



@NgModule({
  declarations: [
    FormRadioButtonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RadioButtonModule,
    MaterialModule
  ],
  exports:[FormRadioButtonComponent]
})
export class FormRadioButtonModule { }
