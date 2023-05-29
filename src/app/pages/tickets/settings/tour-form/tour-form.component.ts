import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';

@Component({
  selector: 'app-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.scss'],
})
export class TourFormComponent implements OnInit {
  tourForm: FormGroup;
  constructor(
    private tourStorage: TiсketsStorageService,
    private messageService: MessageService
  ) {}
    numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = Number.isNaN(+control.value)
      return forbidden ? {mustBeANumber: {value: control.value}} : null;
    };
    }
  ngOnInit(): void {
    this.tourForm = new FormGroup({
      name: new FormControl('', { validators: Validators.required }),
      description: new FormControl('', { validators: Validators.required }),
      tourOperator: new FormControl('', { validators: Validators.required }),
      price: new FormControl(0, {
        validators: [
          Validators.required,
          Validators.min(0),
          this.numberValidator(),
        ],
      }),
      img: new FormControl(''),

    });
  }

  selectFile(event:any){
    // console.log(event);

if(event.target.files.length){
  // console.log(event.target.files[0]);
  
const file = event.target.files[0]
this.tourForm.patchValue({
  img:file
})
}
console.log(this.tourForm);

  }
  async onSubmit(event: SubmitEvent) {
    event.preventDefault();

    try {
      if (this.tourForm.invalid) {
        throw Error('Все поля формы должны быть заполнены');
      }
      const {name,tourOperator,description,price,img} = this.tourForm.value
      console.log(this.tourForm.value);
      const tourDataRow = this.tourForm.getRawValue()
      const formParams = new FormData()
      if(typeof tourDataRow === 'object'){
        for (let prop in tourDataRow){
          console.log(prop);
          
          formParams.append(prop,tourDataRow[prop])
        }
      }
      console.log(formParams);

     await this.tourStorage.createTour(formParams)
      this.messageService.add({
        closable: true,
        severity: 'succes',
        summary: `Заказ сформирован`,
      });
      this.tourForm.reset();
    } catch (error) {
      this.messageService.add({
        closable: true,
        severity: 'warn',
        summary: (<Error>error).message,
      });
    }
  }
}
