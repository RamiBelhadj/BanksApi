import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularIbanModule } from 'angular-iban';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { appReducer } from './shared/store/app.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CustomDateParserFormatter } from './services/data-formatter.service'; 
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularIbanModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({appState: appReducer}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) 
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'de'
   },
   DatePipe,
   {provide: NgbDateParserFormatter,useClass: CustomDateParserFormatter}
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
