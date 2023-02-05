import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IInputType } from '../../../models/frontend/input.model';

import { FormSelectBoxComponent } from './form-select-box.component';

describe('FormSelectBoxComponent', () => {
  let component: FormSelectBoxComponent;
  let fixture: ComponentFixture<FormSelectBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSelectBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSelectBoxComponent);
    component = fixture.componentInstance;
    component.config = selectConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should shows select options', () => {
    component.config = selectConfig;
    fixture.detectChanges();
    let selects = fixture.debugElement.queryAll(
      By.css(".select-box mat-option")
    );

   expect(selects[0].nativeElement.innerHTML.replace(/\s/g, "")).toEqual(selectConfig.subValues[0]);
   expect(selects[1].nativeElement.innerHTML.replace(/\s/g, "")).toEqual(selectConfig.subValues[1]);
   expect(selects[2].nativeElement.innerHTML.replace(/\s/g, "")).toEqual(selectConfig.subValues[2]);
  });

  it("should writeValue not set", () => {
    const spyWriteValue = jest.spyOn(component, "writeValue");
    let value = () => {};
    component.writeValue(value);

    expect(spyWriteValue).toHaveBeenCalled();
  });

  it("should writeValue set value", () => {
    let value: IInputType = {
      type: "string",
      subType: "string",
      formName: "string",
      formValidators: [],
      hint: "string",
      placeholder: "string",
      subValues: 10,
    };
    component.config = value;
    component.writeValue(value);

    expect(component.value).toEqual(value.subValues);
  });

  it("should writeValue set value without subvalues", () => {
    let value: IInputType = {
      type: "string",
      subType: "string",
      formName: "string",
      formValidators: [],
      hint: "string",
      placeholder: "string"
    };
    component.config = value;
    component.writeValue(value);

    expect(component.value).toEqual(null);
  });

  it("should register the functions", () => {
    const spyOnChange = jest.spyOn(component, "onChange");
    const spyOnTouch = jest.spyOn(component, "onTouch");
    component.onChange(undefined);
    component.onTouch();
    expect(spyOnChange).toHaveBeenCalled();
    expect(spyOnTouch).toHaveBeenCalled();
  });

  it("should onChangeEvent works", () => {
    const spyOnInput = jest.spyOn(component, "onChangeEvent");
    component.onChangeEvent('test');
    expect(spyOnInput).toHaveBeenCalled();
    expect(component.value).toEqual('test');
  });
});

let selectConfig: IInputType = {
  type: 'select',
  subType: 'base',
  formName: 'codigos',
  formValidators: [],
  subValues: ['DNI', 'NIE', 'NIF'],
  deps: {
    master: {
      config: [
        {
          case: 'DNI',
          validator: [Validators.min(0)],
          default: true,
        },
        {
          case: 'NIE',
          validator: [Validators.required],
        },
        {
          case: 'NIF',
          validator: [],
        },
      ],
    },
  },
};
