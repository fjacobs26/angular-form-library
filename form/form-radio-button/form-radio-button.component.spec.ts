import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IDependency, IDepValue, IInputType } from '../../../models/frontend/input.model';
import { FormRadioButtonComponent } from './form-radio-button.component';

describe('FormRadioButtonComponent', () => {
  let component: FormRadioButtonComponent;
  let fixture: ComponentFixture<FormRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRadioButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRadioButtonComponent);
    component = fixture.componentInstance;
    component.config = configToggle;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should shows toggle options', () => {
    component.config = configToggle;
    fixture.detectChanges();
    let toggles = fixture.debugElement.queryAll(
      By.css(".radio mat-button-toggle")
    );

    expect(toggles[0].nativeElement.innerHTML.replace(/\s/g, "")).toEqual(configToggle.subValues[0].label);
    expect(toggles[1].nativeElement.innerHTML.replace(/\s/g, "")).toEqual(configToggle.subValues[1].label);
  });

  it("should register the functions", () => {
    const spyOnChange = jest.spyOn(component, "onChange");
    const spyOnTouch = jest.spyOn(component, "onTouch");
    component.onChange(undefined);
    component.onTouch();
    expect(spyOnChange).toHaveBeenCalled();
    expect(spyOnTouch).toHaveBeenCalled();
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

  it("should onClick works", () => {
    const spyOnInput = jest.spyOn(component, "onClick");
    let depValue: IDepValue = {
      case: 'test',
      validator: []
    };
    let deps: IDependency = {
      master: { config: [depValue] }
    };

    let value: IInputType = {
      type: "string",
      subType: "string",
      formName: "string",
      deps: deps
    };
    component.config = value;
    component.onClick('test');
    expect(spyOnInput).toHaveBeenCalled();
    expect(component.value).toEqual('test');
  });

});

let configToggle: IInputType = {
  type: 'radio',
  subType: 'toogle',
  formName: 'tratamiento',
  subValues: [ 
    {code: "sr01", label : 'sr'}, 
    {code: "sr02", label : 'sra'}
  ],
  formValidators: [],
};