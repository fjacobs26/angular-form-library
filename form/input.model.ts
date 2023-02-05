import { Validators } from "@angular/forms";

export interface IFormValue {
    input: IInputType;
    header?: string;
    footer?: IFooter;
}
export interface IFormResponse {

}
export interface IFooter{
    text: string;
    valid?: boolean;
    customClass?: string;
}
export interface IInputType{
    type: string;
    subType: string;
    formName: string;
    formValidators?: Validators[];
    hint?: string;
    placeholder?: string;
    subValues?: string | number | string[] | ISelectTypes[]; 
    extra?: IExtraTypes;
    deps?: IDependency;
}
export interface IFormConfig{
    formName: string;
    validatorConfig: IMaster;
}
export interface ISlaveConfig{
    masterFormName: string;
    slaveFormName: string;
}
interface IMaster{
    config: IDepValue[];
}
interface ISecondary{
    formName: string;
}
export interface IDependency{
    master?: IMaster;
    secondary?: ISecondary;  
}
export interface IDepValue{
    case: string;
    validator: Validators[];
    default?: boolean;
}


export interface ISelectTypes{
    groupCode?: string;
    code?: string;
    lang?: string;
    label?: string;
    helpText?: string;
}
interface IExtraTypes{
    nimSpace?: number;
    maxSpace?: number;
    suffix?: {
        message: string;
        class?: string;
    };
    prefix?: {
        message: string;
        class?: string;
    };
    minDate?: Date;
    maxDate?: Date;
}
