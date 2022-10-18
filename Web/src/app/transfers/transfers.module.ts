import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransfersRoutingModule } from './transfers-routing.module';
import { HomeComponent, NgbdSortableHeader } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { transferReducer } from './store/transfers.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TransfersEffect } from './store/transfers.effect';
import { AngularIbanModule } from 'angular-iban';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    EditComponent,
    NgbdSortableHeader
  ],
  imports: [
    FormsModule,
    CommonModule,
    TransfersRoutingModule,
    AngularIbanModule,
    NgbModule,
    ReactiveFormsModule,
    StoreModule.forFeature('myTransfers', transferReducer),
    EffectsModule.forFeature([TransfersEffect]),
  ],
  
})
export class TransfersModule { }
