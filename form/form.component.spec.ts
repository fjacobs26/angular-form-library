import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { IFormValue, ISlaveConfig } from "../../models/frontend/input.model";
import { FormCheckboxModule } from "./form-checkbox/form-checkbox.module";
import { FormDatepickerModule } from "./form-datepicker/form-datepicker.module";
import { FormInputModule } from "./form-input/form-input.module";
import { FormRadioButtonModule } from "./form-radio-button/form-radio-button.module";
import { FormSelectBoxModule } from "./form-select-box/form-select-box.module";
import { FormComponent } from "./form.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatNativeDateModule } from "@angular/material/core";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { MaterialModule } from "../../styles/material.module";
import { MatInputModule } from "@angular/material/input";

describe("FormComponent", () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let customerItems: BehaviorSubject<IFormValue[]> = new BehaviorSubject<
    IFormValue[]
  >(undefined);
  let formBuilder: FormBuilder;
  let formFieldsText: DebugElement[];
  let formFieldsRadio: DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatNativeDateModule,
        MatInputModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormCheckboxModule,
        FormDatepickerModule,
        FormInputModule,
        FormRadioButtonModule,
        FormSelectBoxModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    customerItems.next(items);
    component.formItem = customerItems;
    fixture.detectChanges();
    formFieldsText = fixture.debugElement.queryAll(By.css("lib-form-input"));
    formFieldsRadio = fixture.debugElement.queryAll(By.css("lib-form-radio-button"));
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load form-input text inputs", () => {
    fixture.detectChanges();

    expect(formFieldsText[0].nativeElement.getAttribute("ng-reflect-name")).toEqual(items[0].input.formName);
    expect(formFieldsText[1].nativeElement.getAttribute("ng-reflect-name")).toEqual(items[1].input.formName);
    expect(formFieldsText[2].nativeElement.getAttribute("ng-reflect-name")).toEqual(items[2].input.formName);
    expect(formFieldsText[3].nativeElement.getAttribute("ng-reflect-name")).toEqual(items[9].input.formName);
  });

  it("should load form-radio inputs", () => {
    fixture.detectChanges();

    expect(formFieldsRadio[0].nativeElement.getAttribute("ng-reflect-name")).toEqual(items[3].input.formName);
    expect(formFieldsRadio[1].nativeElement.getAttribute("ng-reflect-name")).toEqual(items[4].input.formName);
  });

  it("should load form-checkbox inputs", () => {
    fixture.detectChanges();

    let checkboxFields = fixture.debugElement.queryAll(By.css("lib-form-checkbox"));
    expect(checkboxFields[0].nativeElement.getAttribute("ng-reflect-name")).toEqual(items[5].input.formName);
  });

  it("should load form-select-box inputs", () => {
    fixture.detectChanges();

    let checkboxFields = fixture.debugElement.queryAll(By.css("lib-form-select-box"));
    expect(checkboxFields[0].nativeElement.getAttribute("ng-reflect-name")).toEqual(items[6].input.formName);
  });

  it("should ngOnInit works", () => {
    const spyNgOnInit = jest.spyOn(component, "ngOnInit");
    component.previousGroup = formGroupMocked;
    component.ngOnInit();
    expect(spyNgOnInit).toHaveBeenCalled();
  });

  it("should submitForm works", () => {
    const spySubmitForm = jest.spyOn(component, "submitForm");
    component.previousGroup = formGroupMocked;
    let event: Event = new Event('');
    component.submitForm(event);
    expect(spySubmitForm).toHaveBeenCalled();
  });

  it("should changeChildValidator works", () => {
    const spyChangeChildValidator = jest.spyOn(component, "changeChildValidator");
    let depsSlaveStorage: ISlaveConfig[] = [
      {
        masterFormName: 'mastertest',
        slaveFormName: 'slavetest'
      }
    ];
    component.customGroup = new FormGroup({
      slavetest: new FormControl(""),
    });
    component.depsSlaveStorage = depsSlaveStorage;
    component.changeChildValidator(depsSlaveStorage[0]);
    expect(spyChangeChildValidator).toHaveBeenCalled();
  });
  
});

let formGroupMocked = new FormGroup({
  formcomponent: new FormControl(""),
});

const items: IFormValue[] = [
  {
    input: {
      formName: "nombre",
      type: "text",
      subType: "text",
      formValidators: [],
      placeholder: "nombre",
      hint: "soy tu nombre",
      subValues: "name personal",
    },
    header: "prueba header",
    footer: {
      text: "prueba footer",
      valid: false
    },
  },
  {
    input: {
      type: "text",
      subType: "email",
      formName: "email",
      placeholder: "test@test.es",
      formValidators: [Validators.required, Validators.email],
      subValues: "email@email.es",
    },
    header: "prueba header",
    footer: {
      text: "prueba footer",
      valid: false
    },
  },
  {
    input: {
      type: "text",
      subType: "number",
      formName: "edad",
      placeholder: "numero",
      formValidators: [Validators.required, Validators.pattern("")],
    },
  },
  {
    input: {
      type: "radio",
      subType: "toogle",
      formName: "tratamiento",
      subValues: ["sr", "sra"],
      formValidators: [],
    },
  },
  {
    input: {
      type: "radio",
      subType: "base",
      formName: "genero",
      subValues: ["masculino", "femenino", "tetera"],
      formValidators: [],
    },
  },
  {
    input: {
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
    },
  },
  {
    input: {
      type: "select",
      subType: "base",
      formName: "codigos",
      formValidators: [],
      subValues: ["DNI", "NIE", "NIF"],
      deps: {
        master: {
          config: [
            {
              case: "DNI",
              validator: [Validators.min(0)],
              default: true,
            },
            {
              case: "NIE",
              validator: [Validators.required],
            },
            {
              case: "NIF",
              validator: [],
            },
          ],
        },
      },
    },
  },
  {
    input: {
      type: "datepicker",
      subType: "base",
      formName: "fecha_normal",
      formValidators: [],
    },
  },
  {
    input: {
      type: "datepicker",
      subType: "dateRange",
      formName: "fecha_rango",
      formValidators: [],
      extra: {
        maxDate: new Date(),
        minDate: new Date(2009, 0, 31),
      },
    },
  },
  {
    input: {
      type: "text",
      subType: "text",
      formName: "depende_de",
      placeholder: "dependo del select",
      deps: {
        secondary: {
          formName: "codigos",
        },
      },
    },
  },
];
