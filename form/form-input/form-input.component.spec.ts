import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IInputType } from '../../../../shared/models/frontend/input.model';
import { FormInputComponent } from './form-input.component';

describe('FormInputComponent', () => {
  let component: FormInputComponent;
  let fixture: ComponentFixture<FormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputComponent ],
      imports: [
        CommonModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputComponent);
    component = fixture.componentInstance;
    component.config = config;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load text input', () => {
    component.config = config;
    fixture.detectChanges();
    let input = fixture.debugElement.query(
      By.css("input")
    ).nativeElement;

    expect(input.getAttribute("placeholder")).toEqual(config.placeholder);
  });

  it('should register the functions', () => {
    const spyOnChange = jest.spyOn(component, 'onChange');
    const spyOnTouch = jest.spyOn(component, 'onTouch');
    component.onChange(undefined);
    component.onTouch();
    expect(spyOnChange).toHaveBeenCalled();
    expect(spyOnTouch).toHaveBeenCalled();
  });

  it('should onInput works', () => {
    const spyOnInput = jest.spyOn(component, 'onInput');
    component.onInput(0);
    expect(spyOnInput).toHaveBeenCalled();
    expect(component.value).toEqual(0);
  });

});

let config: IInputType = {
  formName: "nombre",
  type: "text",
  subType: "text",
  placeholder: "nombre",
  hint: "soy tu nombre"
};
