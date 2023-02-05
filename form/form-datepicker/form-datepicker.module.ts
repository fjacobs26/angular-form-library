import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDatepickerComponent } from './form-datepicker.component';
import { MaterialModule } from '../../../styles/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  declarations: [
    FormDatepickerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  exports: [FormDatepickerComponent]
})
export class FormDatepickerModule { }
