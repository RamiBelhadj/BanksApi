import { createAction, props } from "@ngrx/store";
import { Transfers } from "./transfers";

export const invokeTransferAPI = createAction(
    '[Transfer API] invoke Transfers Fetch API'
)

export const transfersFetchAPISuccess = createAction(
    '[Transfer API] Fetch API Success',
    props<{allTransfers : Transfers[]}> ()
)

export const invokeSaveNewTransferAPI = createAction(
    '[Transfer API] Invoke save new transfer api',
    props<{newTransfer: Transfers}>()
)

export const saveNewTransferAPISuccess = createAction(
    '[Transfer API] save new Transfer api success',
    props<{newTransfer: Transfers}>()
)

export const invokeUpdateTransferAPI = createAction(
    '[Transfer API] Invoke update transfer api',
    props<{updateTransfer : Transfers}>()
)

export const updateTransferAPISuccess = createAction(
    '[Transfer API] update Transfer api success',
    props<{updateTransfer: Transfers}>()
)


export const invokeDeleteTransferAPI = createAction(
    '[Transfer API] Invoke delete transfer api',
    props<{id : string}>()
)

export const deleteTransferAPISuccess = createAction(
    '[Transfer API] delete Transfer api success',
    props<{id: string}>()
)