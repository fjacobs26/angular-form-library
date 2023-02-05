import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import moment from "moment";
import { IInputType } from "../../../models/frontend/input.model";
import { FormDatepickerComponent } from "./form-datepicker.component";

describe("FormDatepickerComponent", () => {
  let component: FormDatepickerComponent;
  let fixture: ComponentFixture<FormDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDatepickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDatepickerComponent);
    component = fixture.componentInstance;
    component.config = configDatePickerBase;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should shows base datepicker", () => {
    component.config = configDatePickerBase;
    fixture.detectChanges();
    let datepicker = fixture.debugElement.queryAll(
      By.css(".datepicker mat-datepicker")
    );
    expect(datepicker).toBeTruthy();
  });

  it("should ranged datepicker works", () => {
    component.config = configDatePickerRanged;
    fixture.detectChanges();
    let datepicker = fixture.debugElement.query(
      By.css(".datepicker input")
    ).nativeElement;
    expect(datepicker.getAttribute("min")).toEqual(
      configDatePickerRanged.extra.minDate.toString()
    );
    expect(datepicker.getAttribute("max")).toEqual(
      configDatePickerRanged.extra.maxDate.toString()
    );
  });

  it("should register the functions", () => {
    const spyOnChange = jest.spyOn(component, "onChange");
    const spyOnTouch = jest.spyOn(component, "onTouch");
    component.onChange(undefined);
    component.onTouch();
    expect(spyOnChange).toHaveBeenCalled();
    expect(spyOnTouch).toHaveBeenCalled();
  });

  it("should onInput works", () => {
    const spyOnInput = jest.spyOn(component, "onChangeEvent");
    let event = { value: "2000-01-20 22:00:00" };
    component.onChangeEvent(event);
    expect(spyOnInput).toHaveBeenCalled();
    expect(component.value).toEqual(
      moment(moment(event.value).utc().format("YYYY-MM-DD HH:mm:ss")).toDate()
    );
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
});

let configDatePickerBase: IInputType = {
  type: "datepicker",
  subType: "base",
  formName: "fecha_normal",
  formValidators: [],
};

let configDatePickerRanged: IInputType = {
  type: "datepicker",
  subType: "dateRange",
  formName: "fecha_rango",
  formValidators: [],
  extra: {
    maxDate: new Date(),
    minDate: new Date(2009, 0, 31),
  },
};
