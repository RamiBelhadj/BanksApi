import { DatePipe } from '@angular/common';
import { compileNgModule } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { CustomDateParserFormatter } from 'src/app/data-formatter.service';
import { Transfers } from '../store/transfers';

import { AddComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, StoreModule.forRoot({},{}),NgbModule], 
      declarations:[AddComponent],
      providers:[DatePipe,{provide: NgbDateParserFormatter,useClass: CustomDateParserFormatter}]
    })
    fixture = TestBed.createComponent(AddComponent)
    component = fixture.componentInstance
    component.ngOnInit()
  });   

  it('form invalid when empty', () => {
    expect(component.transferForm.valid).toBeFalsy();
  });

  it('accountHolder field invalidity', () =>{
    let errors = {}
    let accountHolder = component.transferForm.controls['accountHolder']
    expect(accountHolder.valid).toBeFalsy();

    errors = accountHolder.errors || {};
    expect(errors['required']).toBeTruthy();

    accountHolder.setValue("xxxxxxxxx");
    errors = accountHolder.errors || {};
    expect(errors['required']).toBeFalsy();
  })

  it('amount field invalidity', () => {
    let errors = {}
    let amount = component.transferForm.controls['amount']
    expect(amount.valid).toBeFalsy()

    errors = amount.errors || {};
    expect(errors['required']).toBeFalsy();
    
    amount.setValue(10)
    errors = amount.errors || {}
    expect(errors['matching']).toBeTruthy()

    amount.setValue(1000)
    errors = amount.errors || {}
    expect(errors['matching']).toBeFalsy()


    amount.setValue(1000000000)
    errors = amount.errors || {}
    expect(errors['matching']).toBeTruthy()

  })


  it('iban field invalidity', () => {
    let errors = {}
    let iban = component.transferForm.controls['iban']
    expect(iban.valid).toBeFalsy()

    errors = iban.errors || {};
    expect(errors['required']).toBeTruthy();
    
    iban.setValue(10)
    errors = iban.errors || {}
    expect(errors['iban']).toBeTruthy()

    iban.setValue('DE12500105170648489890')
    errors = iban.errors || {}
    expect(errors['iban']).toBeFalsy()

    
    iban.setValue('DE1250010517064848989111')
    errors = iban.errors || {}
    expect(errors['iban']).toBeTruthy()

  })


  it('date field invalidity', () => {
    let errors = {}
    let date = component.transferForm.controls['date']
    expect(date.valid).toBeTruthy()

    errors = date.errors || {};
    expect(errors['required']).toBeFalsy();
    
    date.setValue('2022.12.12')
    errors = date.errors || {}
    expect(errors['error']).toBeTruthy()

    date.setValue({day:15, month:10, year:2020})
    errors = date.errors || {}
    expect(errors['error']).toBeFalsy()

    
    date.setValue({day: 12, month:12, year: 2023})
    errors = date.errors || {}
    expect(errors['error']).toBeTruthy()

  })

  it('submitting a form', () => {
    expect(component.transferForm.valid).toBeFalsy();
    component.transferForm.controls['accountHolder'].setValue("xxxxxxxxx");
    component.transferForm.controls['amount'].setValue(500);
    component.transferForm.controls['date'].setValue({day:18, month:10, year:2022});
    component.transferForm.controls['iban'].setValue('DE12500105170648489890');
    component.transferForm.controls['note'].setValue('');
    expect(component.transferForm.valid).toBeTruthy();
    
    component.transferForm.controls['accountHolder'].setValue("xxxxxxxxx");
    component.transferForm.controls['amount'].setValue(20);
    component.transferForm.controls['date'].setValue({day:18, month:10, year:2022});
    component.transferForm.controls['iban'].setValue('DE12500105170648489890');
    component.transferForm.controls['note'].setValue('');
    expect(component.transferForm.valid).toBeFalsy();
  });
});


