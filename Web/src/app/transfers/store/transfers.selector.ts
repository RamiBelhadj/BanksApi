import { Injectable } from "@angular/core";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";

import { Transfers } from "./transfers";

export const selectTransfers = createFeatureSelector<Transfers[]>('myTransfers');

export const selectTransferById = 
    createSelector(selectTransfers, (transfers: Transfers[], props) =>{
        var transferbyId = transfers.filter((_) => _.id == props.id);
        if (transferbyId.length == 0){
            return null
        }
        return transferbyId[0]
    })


@Injectable({
    providedIn: 'root'
    })
    export class TransferSelector {
    /**
     *
     */
    constructor(private store: Store<Transfers>) {}
    /**
     * getTodoList
     */
    public getTransfersList() {
        return this.store.select(selectTransfers);
    }
    }