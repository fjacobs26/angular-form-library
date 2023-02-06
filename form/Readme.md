sample use:
HTML:
<div class="container form-header" *ngIf="(contacDataItem | async)">
    <lib-form class="row" [formItem]="contacDataItem" [isEditable]="true" [previousGroup]="prevGroup" (submitEnd)="contactDataFinish($event)">
        <div class="extra">
            <input type="checkbox" formControlName="otherDireccionCheck" (change)="enableSecondDirection()" class="row" />
            <input type="text" *ngIf="(enableDirection | async)" formControlName="otherDireccionText" (input)="addDirectionText($event.target.value)" class="row" />
        </div>
    </lib-form>
</div>

Form Configuration:
import { Validators } from "@angular/forms";
import { IFormValue } from "sofinco-personalloan-library";
import { PersonalData } from "../personal-data/personal-data.model";

export const contactDataItems = (personalData: PersonalData, radioData: any): IFormValue[] => {
    return [
        {
            input: {
                type: "radio",
                subType: "toogle",
                formName: "tratamiento",
                subValues: radioData,
                formValidators: []
            }
        },
        {
            input: {
                formName: "nombre",
                type: "text",
                subType: "text",
                formValidators: [Validators.required],
                placeholder: "Nombre"
            }
        },
        {
            input: {
                formName: "surnameOne",
                type: "text",
                subType: "text",
                formValidators: [Validators.required],
                placeholder: "Primer Apellido"
            }
        },
        {
            input: {
                formName: "surnameTwo",
                type: "text",
                subType: "text",
                formValidators: [Validators.required],
                placeholder: "Segundo Apellido"
            }
        },
        {
            input: {
                formName: "phoneNumber",
                type: "text",
                subType: "text",
                formValidators: [Validators.required],
                placeholder: "Número de móvil"
            },
            footer: "Necesario para la firma del contrato"
        },
        {
            input: {
                formName: "email",
                type: "text",
                subType: "email",
                formValidators: [Validators.email],
                placeholder: "Email"
            },
            footer: "Necesario para la firma del contrato"
        },
        {
            input: {
                formName: "address",
                type: "text",
                subType: "text",
                formValidators: [Validators.required],
                placeholder: "Dirección"
            }
        }
    ];
}

Typescript
@Component({
  selector: 'lib-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.scss']
})
export class ContactDataComponent {

  @Input() personalData: PersonalData;
  @Input() currentStep: number;
  @Input() readOnly: boolean = false;

  enableDirection: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  contacDataItem: BehaviorSubject<IFormValue[]> = new BehaviorSubject<IFormValue[]>(undefined);
  prevGroup: FormGroup;

  constructor(
    private personalDataService: PersonalDataService,
    private fb: FormBuilder
  ) {
    this.personalDataService.getSelectData('TITRE').subscribe(comboData => {
      this.prevGroup = this.fb.group({
        otherDireccionCheck: ['', []]
      });
      this.contacDataItem.next(contactDataItems(this.personalData, comboData));
    });
  }
  enableSecondDirection() {
    this.enableDirection.next(!this.enableDirection.getValue());
    this.prevGroup.get('otherDireccionCheck').patchValue(!this.enableDirection.getValue());
    if (this.enableDirection.getValue()) {
      this.prevGroup.addControl('otherDireccionText', new FormControl('', []));
    } else {
      this.prevGroup.removeControl('otherDireccionText', { emitEvent: false });
    }
  }
  addDirectionText(input) {
    this.prevGroup.get('otherDireccionText').patchValue(input);
  }

  contactDataFinish(event) {
    console.log(event);
  }

}
