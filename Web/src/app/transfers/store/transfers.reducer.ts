import { createReducer, on } from "@ngrx/store";

import { Transfers } from "./transfers";

import { deleteTransferAPISuccess, saveNewTransferAPISuccess, transfersFetchAPISuccess, updateTransferAPISuccess } from "./transfers.action";

export const initialState: Transfers[] = []; 

export const transferReducer = createReducer(
    initialState,
    
    on(transfersFetchAPISuccess, (state, {allTransfers} ) =>{
        return allTransfers;
    }),

    on(saveNewTransferAPISuccess, (state, {newTransfer})=>{
        let newState = [... state]
        newState.push(newTransfer)
        return newState
    }),

    on(updateTransferAPISuccess, (state, {updateTransfer}) =>{
        
        let newTransfer = []
        state.forEach((element) => {
            if(element.id == updateTransfer.id){
                newTransfer.push(updateTransfer)
            }
            else newTransfer.push(element)
        });
        return newTransfer
    }),

    on(deleteTransferAPISuccess, (state, {id}) => {
        console.log(id)
        let newState = state.filter((_) => _.id != id)
        return newState
    })
);

