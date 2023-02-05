import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NumberStringForm, ObjectForm, StringForm } from '../../models/frontend/form.model';

import { FormService } from './form.service';

describe('FormServiceService', () => {
  let service: FormService;
  let objectFormDNI: Array<ObjectForm> = [
    {id: 'name', value: 'Nombre'},
    {id: 'surname', value: 'Apellidos'},
    {id: 'dni', value: '12345678A'}
  ];

  let objectFormNIE: Array<ObjectForm> = [
    {id: 'name', value: 'Nombre'},
    {id: 'surname', value: 'Apellidos'},
    {id: 'nie', value: 'X3573398A'}
  ];

  let objectFormCIF: Array<ObjectForm> = [
    {id: 'name', value: 'Nombre'},
    {id: 'surname', value: 'Apellidos'},
    {id: 'cif', value: 'C77920718'}
  ];

  let nameForm: StringForm = {
    id: 'name',
    placeholder: 'Nombre',
    minLength: 2,
    maxLength: 20,
    required: true,
    readOnly: false
  };

  let surnameForm: StringForm = {
    id: 'surname', 
    placeholder: 'Apellidos',
    minLength: 2,
    maxLength: 10,
    required: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule
      ]
    }).compileComponents();
    
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#createForm DNI', () => {
    let dniForm: StringForm = {
      id: 'dni',
      readOnly: false, 
      required: true, 
      customValidators: [service.validate('document')]
    };
    expect(service.createForm([nameForm, surnameForm, dniForm], objectFormDNI).value).toEqual({name: 'Nombre', surname: 'Apellidos', dni: '12345678A'});
  });

  it('#createForm NIE', () => {      
    let nieForm: StringForm = {
      id: 'nie',
      readOnly: false, 
      required: true, 
      customValidators: [service.validate('document')]
    };
    expect(service.createForm([nameForm, surnameForm, nieForm], objectFormNIE).value).toEqual({name: 'Nombre', surname: 'Apellidos', nie: 'X3573398A'});
  });

  it('#createForm required checkbox validation', () => {
    let cifForm: StringForm = {
      id: 'check_box',
      readOnly: false, 
      required: true, 
      customValidators: [service.validate('document')]
    };
    expect(
      service.createForm(
        [nameForm, surnameForm, cifForm], objectFormCIF, false, true).value).toEqual({name: 'Nombre', surname: 'Apellidos', check_box: null},
      );
  });

  it('#createForm max min value validation', () => {
    let cifForm: NumberStringForm = {
      id: 'number',
      readOnly: false, 
      required: true,
      maxValue: 10,
      minValue: 1
    };
    expect(
      service.createForm(
        [nameForm, surnameForm, cifForm], objectFormCIF, false, true).value).toEqual({name: 'Nombre', surname: 'Apellidos', number: null},
      );
  });

  it('#createForm email validation', () => {
    let cifForm: NumberStringForm = {
      id: 'email',
      readOnly: false, 
      required: true
    };
    expect(
      service.createForm(
        [nameForm, surnameForm, cifForm], objectFormCIF, false, true).value).toEqual({name: 'Nombre', surname: 'Apellidos', email: null},
      );
  });

  it('#createForm phone number validation', () => {
    let cifForm: NumberStringForm = {
      id: 'phoneNumber',
      readOnly: false, 
      required: true
    };
    expect(
      service.createForm(
        [nameForm, surnameForm, cifForm], objectFormCIF, false, true).value).toEqual({name: 'Nombre', surname: 'Apellidos', phoneNumber: null},
      );
  });

  it('#validate dni fine', () => {
    let validation: ValidatorFn = service.validate('document');
    validation.call(validation, {value:'12345678Z'});
    expect(typeof validation).toEqual('function');
  });

  it('#validate dni fails', () => {
    let validation: ValidatorFn = service.validate('document');
    validation.call(validation, {value: undefined });
    expect(typeof validation).toEqual('function');
  });

  it('#validate nie X', () => {
    let validation: ValidatorFn = service.validate('document');
    validation.call(validation, {value:'X8061336C'});
    expect(typeof validation).toEqual('function');
  });

  it('#validate nie Y', () => {
    let validation: ValidatorFn = service.validate('document');
    validation.call(validation, {value:'Y2503358Y'});
    expect(typeof validation).toEqual('function');
  });

  it('#validate nie Z', () => {
    let validation: ValidatorFn = service.validate('document');
    validation.call(validation, {value:'Z2511348Y'});
    expect(typeof validation).toEqual('function');
  });

  it('#validate nie fails', () => {
    let validation: ValidatorFn = service.validate('document');
    validation.call(validation, {value: undefined});
    expect(typeof validation).toEqual('function');
  });

  it('#validate age', () => {
    let validation: ValidatorFn = service.validate('document');
    validation.call(validation, {value:''});
    expect(typeof validation).toEqual('function');
  });

  it('#validate works on undefined', () => {
    let validation: ValidatorFn = service.validate('');
    validation.call(validation, {value:''});
    expect(validation.name).toEqual('');
  });

  it('#mapDataForm should return mapped array', () => {
    let mappedArray = service.mapDataForm([{key: 'test'}]);
    expect((mappedArray[0].value as any).key).toEqual('test');
  });

});
