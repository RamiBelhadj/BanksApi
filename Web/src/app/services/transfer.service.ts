import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transfers } from '../transfers/store/transfers';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';



@Injectable({
  providedIn: 'root'
})
export class TransferService {
  baseUrl:string = 'http://localhost:3000/transfer';
  constructor(private http: HttpClient) { }
  
  getAll(){
    return this.http.get<Transfers[]>(this.baseUrl);
  }

  getById(id: string){
    
    return this.http.get<Transfers>(this.baseUrl+'/'+id);
  }

  create(payload: Transfers){
    return this.http.post<Transfers>(this.baseUrl, payload)
  }

  update(payload: Transfers){
    return this.http.put<Transfers>(this.baseUrl +'/'+payload.id, payload)
  }

  delete(payload: string):Observable<any>{
    return this.http.delete(this.baseUrl+'/'+payload,{responseType: 'text'})
  }

}
