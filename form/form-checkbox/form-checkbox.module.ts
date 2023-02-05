import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCheckboxComponent } from './form-checkbox.component';
import { MaterialModule } from '../../../styles/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormCheckboxComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [FormCheckboxComponent]
})
export class FormCheckboxModule { }
