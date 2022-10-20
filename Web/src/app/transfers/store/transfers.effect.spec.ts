import { TestBed } from "@angular/core/testing";
import { map, Observable, of, ReplaySubject, switchMap } from "rxjs";
import { TransfersEffect } from "./transfers.effect";
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { deleteTransferAPISuccess, invokeDeleteTransferAPI, invokeSaveNewTransferAPI, invokeTransferAPI, invokeUpdateTransferAPI, saveNewTransferAPISuccess, transfersFetchAPISuccess, updateTransferAPISuccess } from "./transfers.action";
import { initialState } from "./transfers.reducer";
import { TestScheduler } from "rxjs/testing";
import { Transfers } from "./transfers";
import { TransferService } from "src/app/services/transfer.service";
import { cold, hot } from "jasmine-marbles";

describe('Transfer Effects', () => {

    const TransfersService = jasmine.createSpyObj('TransfersService', [
        'getAll',
        'create',
        'update',
        'delete'
    ]);
    let effects: TransfersEffect;
    let actions: Observable<any>;
    let store: MockStore<any>;
    let testScheduler;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
            TransfersEffect,
            provideMockStore({ initialState }),
            provideMockActions(() => actions),
            { provide: TransferService, useValue: TransfersService }
            ]
        });

        effects = TestBed.inject(TransfersEffect);
        store = TestBed.inject(MockStore);
        store.setState({});

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('getAllTransfers',()=>{
        it('should handle invokeTransferAPI and return a getALLtransfers ', ()=>{
            const allTransfers = []
            const action = invokeTransferAPI()
            const outcome = transfersFetchAPISuccess({allTransfers})
            
           
            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b|', { b: allTransfers });
                TransfersService.getAll.and.returnValue(response);
                expectObservable(effects.loadAllTransfers$).toBe('--b', { b: outcome });
            });

        })


    })

    describe('updateTransferAPI', () => { 
        it('should handle invokeUpdateTransferAPI and return a updateTransferAPISuccess status', ()=>{
            const updateTransfer : Transfers = { 
                "accountHolder": "Max Mustermann",
                "amount": 500,
                "iban": "DE75512108001245126199",
                "date": "2022-07-01T16:36:49.594Z",
                "note": "A new transfer",
                "id": "048a4a03-18ff-4ed4-a239-f6b5bc82b72f" 
            };
            const action = invokeUpdateTransferAPI({ updateTransfer})
            const outcome = updateTransferAPISuccess({ updateTransfer})
            
            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b|', {b: updateTransfer });
                TransfersService.update.and.returnValue(response);
                expectObservable(effects.updateTransferAPI$).toBe('--b', { b: outcome });
            });
            
        })
     })    

     describe('saveNewTransfer', () => { 
        it('should handle invokeSaveNewTransferAPI and return a saveNewTransferAPISuccess status', ()=>{
            const newTransfer : Transfers = { 
                "accountHolder": "Max Mustermann2",
                "amount": 4000,
                "iban": "DE75512108001245126199",
                "date": "2022-07-11T16:36:49.594Z",
                "note": "A new transfer"
            };
            const action = invokeSaveNewTransferAPI({ newTransfer})
            const outcome = saveNewTransferAPISuccess({ newTransfer})
            
            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b|', {b: newTransfer });
                TransfersService.create.and.returnValue(response);
                expectObservable(effects.saveNewTransfer$).toBe('--b', { b: outcome });
            });
            
        })
     })   
     describe('deleteTransferAPI', () => { 
        it('should handle invokeSaveNewTransferAPI and return a saveNewTransferAPISuccess status', ()=>{
            const id: string  = "048a4a03-18ff-4ed4-a239-f6b5bc82b72f"
            const action = invokeDeleteTransferAPI({ id})
            const outcome = deleteTransferAPISuccess({ id})
            
            testScheduler.run(({ hot, cold, expectObservable }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b|', {b: id });
                TransfersService.delete.and.returnValue(response);
                expectObservable(effects.deleteTransferAPI$).toBe('--b', { b: outcome });
            });
            
        })
     })   
})


