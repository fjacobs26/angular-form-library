import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IFormConfig, IFormResponse, IFormValue, ISlaveConfig } from '../../models/frontend/input.model';
@Component({
  selector: 'lib-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {

  @Input() formItem: BehaviorSubject<IFormValue[]> = new BehaviorSubject<IFormValue[]>(undefined);
  @Input() formClass: string = '';
  @Input() isEditable: boolean = true;
  @Input() previousGroup: FormGroup = new FormGroup({});
  @Input() buttonName: string = "Validar y continuar";

  depsMasterStorage: IFormConfig[] = [];
  depsSlaveStorage: ISlaveConfig[] = [];

  customGroup: FormGroup;
  isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @Output() submitEnd = new EventEmitter<IFormResponse>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.previousGroup) {
      this.customGroup = this.previousGroup;
    }
    this.formItem.subscribe(formValues => {
      this.buildForm(formValues);
    });
  }

  private buildForm(formValues: IFormValue[]) {
    const fbGroup = {};
    formValues.forEach(fbg => {
      const { input:
        {
          formName = undefined,
          formValidators = [],
          deps: { master = undefined, secondary = undefined } = {}
        } = {} } = fbg || {};
      let validatesValue = ['', formValidators];
      if (master) {
        this.depsMasterStorage.push({ formName: formName, validatorConfig: master });
      } else if (secondary) {
        this.depsMasterStorage.forEach(dependency => {
          if (dependency.formName === secondary.formName) {
            validatesValue = ['', dependency.validatorConfig.config.find(validator => validator.default).validator];
            this.depsSlaveStorage.push({ masterFormName: dependency.formName, slaveFormName: formName });
          }
        });
      }
      fbGroup[formName] = validatesValue;
    });
    this.customGroup = this.fb.group(fbGroup);
    this.isReady.next(true);
  }

  ngOnDestroy(): void {
    this.depsMasterStorage = [];
    this.depsSlaveStorage = [];
    this.isReady.complete();
  }
  submitForm(event) {
    event.preventDefault();
    this.submitEnd.emit(this.customGroup.value);
  }
  changeChildValidator(value) {
    const { slaveFormName = undefined } = this.depsSlaveStorage.find(slave => value.masterFormName === slave.masterFormName);
    this.customGroup.get(slaveFormName).clearValidators();
    this.customGroup.get(slaveFormName).setValidators(value.changeValidator?.validator);
  }
}
