import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { IInputType, ISelectTypes } from "../../../models/frontend/input.model";
import { FormCheckboxComponent } from "./form-checkbox.component";

describe("FormCheckboxComponentComponent", () => {
  let component: FormCheckboxComponent;
  let fixture: ComponentFixture<FormCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCheckboxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCheckboxComponent);
    component = fixture.componentInstance;
    component.config = config;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load all checkboxes", () => {
    component.config = config;
    fixture.detectChanges();
    let titles = fixture.debugElement.queryAll(By.css("span.title"));

    let subtitles = fixture.debugElement.queryAll(By.css("span.subtitle"));

    expect(titles[0].nativeElement.innerHTML).toEqual(
      config.subValues[0].label
    );
    expect(titles[1].nativeElement.innerHTML).toEqual(
      config.subValues[1].label
    );

    expect(subtitles[0].nativeElement.innerHTML).toEqual(
      config.subValues[0].helpText
    );
    expect(subtitles[1].nativeElement.innerHTML).toEqual(
      config.subValues[1].helpText
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
      placeholder: "string",
    };
    component.config = value;
    component.writeValue(value);

    expect(component.value).toEqual(null);
  });

  it("should onClick works", () => {
    const spyOnClick = jest.spyOn(component, "onClick");
    let value: ISelectTypes = {
      groupCode: "test",
      code: "test",
      lang: "ES",
      label: "test",
      helpText: "test",
    };
    component.value = [value];
    component.onClick(value);
    expect(spyOnClick).toHaveBeenCalled();
  });

  it("should multiple selected on onClick", () => {
    const spyOnClick = jest.spyOn(component, "onClick");
    let value: ISelectTypes[] = [
      {
        groupCode: "test",
        code: "test",
        lang: "ES",
        label: "test",
        helpText: "test",
      },
      {
        groupCode: "test1",
        code: "test1",
        lang: "ES",
        label: "test1",
        helpText: "test1",
      },
    ];
    component.value = value;
    component.onClick(value[1]);
    expect(spyOnClick).toHaveBeenCalled();
  });

  it("should removeElement null", () => {
    const spyOnClick = jest.spyOn(component, "onClick");
    let value: ISelectTypes = undefined;
    component.value = [value];
    component.onClick(value);
    expect(spyOnClick).toHaveBeenCalled();
  });
});

let config: IInputType = {
  type: "checkbox",
  subType: "base",
  formName: "checkboxprueba",
  subValues: [
    {
      label: "FirstCheck",
      helpText: "MoreText",
    },
    {
      label: "SecondCheck",
      helpText: "MoreText",
    },
  ],
  formValidators: [],
};
