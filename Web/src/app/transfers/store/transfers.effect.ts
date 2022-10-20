import { Injectable} from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store} from '@ngrx/store'
import {  EMPTY, exhaustMap, map, merge, mergeMap, switchMap, withLatestFrom } from 'rxjs'
import { TransferService } from 'src/app/services/transfer.service'
import { setAPIStatus } from 'src/app/shared/store/app.action'
import { Appstate } from 'src/app/shared/store/appstate'
import { transfersFetchAPISuccess, invokeTransferAPI, invokeSaveNewTransferAPI, saveNewTransferAPISuccess, invokeUpdateTransferAPI, updateTransferAPISuccess, invokeDeleteTransferAPI, deleteTransferAPISuccess } from './transfers.action'
import { selectTransfers } from './transfers.selector'

@Injectable()
export class TransfersEffect {
    
    constructor( 
        private action$ : Actions,
        private transfersService: TransferService,
        private store : Store,
        private appStore: Store<Appstate>
    ){}


    loadAllTransfers$ = createEffect(() =>
        this.action$.pipe(
            ofType(invokeTransferAPI),
            exhaustMap(() => 
                this.transfersService.getAll().pipe(map((data) => transfersFetchAPISuccess({allTransfers: data})))
            )   
        )
    )

    saveNewTransfer$ = createEffect(() => {
        return this.action$.pipe(
            ofType(invokeSaveNewTransferAPI),
            mergeMap((action) =>{
                this.appStore.dispatch(
                    setAPIStatus({
                        apiStatus:{
                            apiResponseMessage:'',
                            apiStatus:''
                        }
                    })
                    )
                return this.transfersService.create(action.newTransfer).pipe(
                    map((data) =>{
                        this.appStore.dispatch(
                            setAPIStatus({
                                apiStatus:{ apiResponseMessage: '', apiStatus: 'success' },
                            })
                        )
                        return saveNewTransferAPISuccess({newTransfer: data})
                    })   
                )
            })
        )
    })

    updateTransferAPI$ = createEffect(() => {
        return this.action$.pipe(
            ofType(invokeUpdateTransferAPI),
            mergeMap((action)=>{
                this.appStore.dispatch(
                    setAPIStatus({
                        apiStatus: { apiResponseMessage: '', apiStatus : ''}
                    })
                );
                return this.transfersService.update(action.updateTransfer).pipe(
                    map((data) => {
                        this.appStore.dispatch(
                            setAPIStatus({
                                apiStatus:{ apiResponseMessage: '', apiStatus: 'success' },
                            })
                        )
                        return updateTransferAPISuccess({updateTransfer: data})
                    })
                )
            })
            
        )
    })

    deleteTransferAPI$ = createEffect(() =>{
        return this.action$.pipe(
            ofType(invokeDeleteTransferAPI),
            mergeMap((actions) => {
                
                this.appStore.dispatch(
                    setAPIStatus({apiStatus : {
                        apiResponseMessage:'', apiStatus: ''
                    }})
                )
                
                return this.transfersService.delete(actions.id).pipe(
                    map(() =>{
                        
                        this.appStore.dispatch(
                            setAPIStatus({
                                apiStatus:{ apiResponseMessage: '', apiStatus: 'success' },
                            })
                        )
                        return deleteTransferAPISuccess({id: actions.id})
                    })                    
                )
            })
        )
    })
}
