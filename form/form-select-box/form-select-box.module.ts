import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSelectBoxComponent } from './form-select-box.component';
import { MaterialModule } from '../../../styles/material.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    FormSelectBoxComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[FormSelectBoxComponent]
})
export class FormSelectBoxModule { }
