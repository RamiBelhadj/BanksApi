import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Transfers } from '../store/transfers';
import { invokeSaveNewTransferAPI } from '../store/transfers.action';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ValidatorService} from 'angular-iban';
import Validation from 'src/app/Utils/validator';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router : Router,
    private fb: FormBuilder,
    public datepipe: DatePipe,
  ) { }

  
  
  transferForm: FormGroup = new FormGroup({
    accountHolder: new FormControl(''),
    amount: new FormControl(0),
    iban: new FormControl(''),
    note: new FormControl(''),
    date: new FormControl({})
  });
  submitted = false;
  ngOnInit(): void {
    this.transferForm = this.fb.group({
      accountHolder: ['',Validators.required],
      amount : [0,Validators.required],
      iban : ['',[Validators.required, ValidatorService.validateIban]],
      note : [''],
      date : [{
        day: new Date().getDate(),
        month: new Date().getMonth()+1,
        year: new Date().getFullYear()}
      ,Validators.required ]
    },
    {
      validators: [Validation.between('amount'), Validation.dateFormat('date')]
    })
   
  }
  get f(): { [key: string]: AbstractControl } {
      return this.transferForm.controls;
    }
  save() {
    
    this.submitted = true
    if (this.f['accountHolder'].errors || this.f['amount'].errors || this.f['iban'].errors || this.f['date'].errors ){
      return
    }
    let date = new Date()
    date.setDate(this.transferForm.get('date').value.day)
    date.setMonth(this.transferForm.get('date').value.month-1)
    date.setFullYear(this.transferForm.get('date').value.year)
    let transfer : Transfers = {
      accountHolder: this.transferForm.get('accountHolder').value,
      amount: this.transferForm.get('amount').value,
      iban: this.transferForm.get('iban').value,
      date: date.toISOString(),
      note: this.transferForm.get('note').value,
    }
    
    this.store.dispatch(invokeSaveNewTransferAPI({newTransfer:transfer}))
    let apiStatus$ = this.appStore.pipe(select(selectAppState))
    apiStatus$.subscribe((appState) =>{
      if(appState.apiStatus == "success"){
        this.appStore.dispatch(
          setAPIStatus({apiStatus:{ 
            apiResponseMessage:'',
            apiStatus:''
          }})
        )
        this.router.navigate(['/'])
      }
    })

  }

}
