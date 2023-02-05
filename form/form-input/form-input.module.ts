import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './form-input.component';
import { MaterialModule } from '../../../styles/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormInputComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormInputComponent
  ]
})
export class FormInputModule { }
