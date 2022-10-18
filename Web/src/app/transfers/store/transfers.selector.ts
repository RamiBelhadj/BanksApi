import { createFeatureSelector, createSelector } from "@ngrx/store";

import { Transfers } from "./transfers";

export const selectTransfers = createFeatureSelector<Transfers[]>('myTransfers');

export const selectTransferById = (TransferId: string| null) => 

    createSelector(selectTransfers, (transfers: Transfers[])=>{
        var transferbyId = transfers.filter((_) => _.id == TransferId);
        if (transferbyId.length == 0){
            return null
        }
        return transferbyId[0]
    })
    
