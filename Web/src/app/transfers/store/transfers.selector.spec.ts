import { createSelector, select, Store } from "@ngrx/store"
import { Transfers } from "./transfers"
import { selectTransferById, selectTransfers, TransferSelector } from "./transfers.selector"

describe('Transfer Selectors', () => {
    it('return existing transfer', () => {
        let id = "7ae46136-dfab-4452-b361-03c2cd6e3541"

        const expectedState : Transfers ={
            "accountHolder": "Max Musterjunge",
            "amount": 500,
            "iban": "DE75512108001245126199",
            "date": "2022-07-05T16:33:58.974Z",
            "note": "A new transferss",
            "id": "7ae46136-dfab-4452-b361-03c2cd6e3541"
        }
        const transfers : Transfers[] = [
            {
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
                "accountHolder": "Max Musterjunge",
                "amount": 500,
                "iban": "DE75512108001245126199",
                "date": "2022-07-05T16:33:58.974Z",
                "note": "A new transferss",
                "id": "7ae46136-dfab-4452-b361-03c2cd6e3541"
            }
        ]
        
        expect(selectTransferById.projector(transfers, {id:id})).toEqual(expectedState)
       
    })

    it('Search for non existing transfer Id', () => {
        let id = "nonExist"

        
        const transfers : Transfers[] = [
            {
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
                "accountHolder": "Max Musterjunge",
                "amount": 500,
                "iban": "DE75512108001245126199",
                "date": "2022-07-05T16:33:58.974Z",
                "note": "A new transferss",
                "id": "7ae46136-dfab-4452-b361-03c2cd6e3541"
            }
        ]
        
        expect(selectTransferById.projector(transfers, {id:id})).toEqual(null)
       
    })

    

})