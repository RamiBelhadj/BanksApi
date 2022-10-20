import { ActivatedRoute } from '@angular/router';
import {createReducer} from '@ngrx/store'
import { Action } from 'rxjs/internal/scheduler/Action';
import { Transfers } from "./transfers";

import { deleteTransferAPISuccess, saveNewTransferAPISuccess, transfersFetchAPISuccess, updateTransferAPISuccess } from "./transfers.action";
import { initialState, transferReducer } from './transfers.reducer';

describe('Transfer reducer', () => {
    it('[Transfer API] Fetch API Success',() => {
        const transfer : Transfers = {}
        transfer.id = "048a4a03-18ff-4ed4-a239-f6b5bc82b72f"
        const transfers: Transfers[] = [transfer]
        
        const action = transfersFetchAPISuccess( {allTransfers: transfers})

        const result = transferReducer(initialState, action)
        
        expect(result).toEqual(transfers)
    })

    it('[Transfer API] save new Transfer api success', () => {
        const transfers: Transfers[] = []

        const transfer : Transfers = {
            "accountHolder": "Max Mustermann",
            "amount": 350,
            "iban": "DE75512108001245126199",
            "date": "2022-07-01T16:36:49.594Z",
            "note": "A new transfer",
            "id": "048a4a03-18ff-4ed4-a239-f6b5bc82b72f"
          }
        const action = saveNewTransferAPISuccess({newTransfer: transfer})

        const result = transferReducer(initialState, action)
        
        expect(result).toEqual([transfer])
    })

    it('[Transfer API] update Transfer api success', () => {
        const transfer : Transfers = {
            "accountHolder": "Max Mustermann",
            "amount": 350,
            "iban": "DE75512108001245126199",
            "date": "2022-07-01T16:36:49.594Z",
            "note": "A new transfer",
            "id": "048a4a03-18ff-4ed4-a239-f6b5bc82b72f"
          }
        const transfers: Transfers[] = [transfer]
        transfer.amount = 500
        
        const action = updateTransferAPISuccess({updateTransfer: transfer})
        const expectedState: Transfers[] = [{
            ...initialState,
            ...transfer
          }];
        const result = transferReducer(transfers, action)
        expect(result).toEqual(expectedState)

    })

    it('[Transfer API] delete Transfer api success', () => {
        let transfers : Transfers[] = [{
            "accountHolder": "Max Mustermann",
            "amount": 350,
            "iban": "DE75512108001245126199",
            "date": "2022-07-01T16:36:49.594Z",
            "note": "A new transfer",
            "id": "048a4a03-18ff-4ed4-a239-f6b5bc82b72f"
          },
          {
            "accountHolder": "Max Musterfrau",
            "iban": "DE75512108001245126199",
            "amount": 200,
            "date": "2022-07-02T15:55:46.936Z",
            "note": "A new transfer",
            "id": "4abe1a0d-bc14-48cb-8416-602c0db2ef21"
          },
          {
            "accountHolder": "Max Musterkind",
            "iban": "DE75512108001245126199",
            "amount": 300,
            "date": "2022-07-03T15:55:46.936Z",
            "note": "A new transfer",
            "id": "9ed8d3fc-f15b-476c-aaa6-f61709e9f891"
          },
          {
            "accountHolder": "Max Mustermädchen",
            "iban": "DE75512108001245126199",
            "amount": 400,
            "date": "2022-07-04T15:55:46.936Z",
            "note": "A new transfer",
            "id": "10084d55-df22-4435-ba9c-2434fc0d2081"
          },
          {
            "accountHolder": "Max Musterjunge",
            "amount": 500,
            "iban": "DE75512108001245126199",
            "date": "2022-07-05T16:33:58.974Z",
            "note": "A new transferss",
            "id": "7ae46136-dfab-4452-b361-03c2cd6e3541"
          }]
        const id = "7ae46136-dfab-4452-b361-03c2cd6e3541"
        const action = deleteTransferAPISuccess({id: id})
        const result = transferReducer(transfers, action)
        
        transfers = transfers.filter( transfer => {
            return transfer.id !== id
        })
        expect(result).toEqual(transfers)
    })

})