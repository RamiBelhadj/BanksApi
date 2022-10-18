import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { Transfers } from '../store/transfers';
import { invokeUpdateTransferAPI } from '../store/transfers.action';
import { selectTransferById } from '../store/transfers.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'angular-iban';
import Validation from 'src/app/Utils/validator';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private appStore: Store<Appstate>,
    private router : Router,
    private fb: FormBuilder,
  ) { }

  transferForm: FormGroup = new FormGroup({
    accountHolder: new FormControl(''),
    amount: new FormControl(0),
    iban: new FormControl(''),
    note: new FormControl(''),
    date: new FormControl({})
  });
  submitted = false;
  
  transfer : Transfers = {
    accountHolder:'',
    amount : 0,
    iban : '',
    note : ''
  }
  
  ngOnInit(): void {
    
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = params.get('id')
         
        return this.store.pipe(select(selectTransferById(id)))
        //return 
      })
    )
    fetchData$.subscribe((data) => {
      if (data) {
          this.transfer= {...data}
        
        
      }
      else this.router.navigate(['/']);
    })
    this.transferForm = this.fb.group({
      accountHolder: [this.transfer.accountHolder,Validators.required],
      amount : [this.transfer.amount,Validators.required],
      iban : [this.transfer.iban,[Validators.required, ValidatorService.validateIban]],
      note : [this.transfer.note],
      date : [{
        day: new Date(this.transfer.date).getDate(),
        month: new Date(this.transfer.date).getMonth()+1,
        year: new Date(this.transfer.date).getFullYear()}
      ,Validators.required ]
    },
    {
      validators: [Validation.between('amount'), Validation.dateFormat('date')]
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.transferForm.controls;
  }
  update() {
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
      id: this.transfer.id
    }

    this.store.dispatch( 
      invokeUpdateTransferAPI({
        updateTransfer : {...transfer}
      })
    )
    let apiStatus$  = this.appStore.pipe(select(selectAppState))
    apiStatus$.subscribe((appState) => {
      if (appState.apiStatus == 'success'){
        this.appStore.dispatch(setAPIStatus({
          apiStatus: {apiResponseMessage: '', apiStatus:''}
        }))
        this.router.navigate(['/'])
      }
    })
  }

}
