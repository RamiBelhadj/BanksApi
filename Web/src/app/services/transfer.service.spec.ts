import { Transfers } from '../transfers/store/transfers';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TransferService } from './transfer.service';
import { defer } from 'rxjs';
import { inject, TestBed } from '@angular/core/testing';

describe('TransferService', () => {
  let service: TransferService;
  let httpTestingController: HttpTestingController;

  const expectedTransfers : Transfers[] = [{
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers: [TransferService]
    })
    service = TestBed.inject(TransferService);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  afterEach(() => { 
    httpTestingController.verify(); 
  }); 

  it('should return expected transfers (HttpClient called once)', () => {
    
    service.getAll().subscribe(res=>{
      expect(res).toEqual(expectedTransfers);
      expect(res.length).toBe(5);
    })
    const req = httpTestingController.expectOne('http://localhost:3000/transfer');
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(expectedTransfers);
    httpTestingController.verify();
    
  });
  

  it('delete should make a DELETE HTTP request with id appended to end of url', () => {
    service.delete('048a4a03-18ff-4ed4-a239-f6b5bc82b72f').subscribe(res => {
      expect(res).toBe('4'); 
     }); 
    const req = httpTestingController.expectOne('http://localhost:3000/transfer/048a4a03-18ff-4ed4-a239-f6b5bc82b72f', 'delete to api');
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('text');
    req.flush(4);
    httpTestingController.verify();
   });

  it('should be created', inject([TransferService], (service: TransferService) => {
    expect(service).toBeTruthy();
  }));

  it('update should make a PUT HTTP request with id appended to end of url and resource as body', () => {
    const updateObj = { "accountHolder": "Max Mustermann",
    "amount": 500,
    "iban": "DE75512108001245126199",
    "date": "2022-07-01T16:36:49.594Z",
    "note": "A new transfer",
    "id": "048a4a03-18ff-4ed4-a239-f6b5bc82b72f" };
    service.update(updateObj).subscribe(res => {
      expect(res.amount).toBe(500); 
     }); 
    const req = httpTestingController.expectOne('http://localhost:3000/transfer/048a4a03-18ff-4ed4-a239-f6b5bc82b72f', 'put to api');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(updateObj);
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(updateObj);
    httpTestingController.verify();
   });

   it('create should make a POST HTTP request with resource as body', () => {
    const createObj = { "accountHolder": "Max Mustermannaa",
    "amount": 100,
    "iban": "DE75512108001245126199",
    "date": "2022-07-01T16:36:49.594Z",
    "note": "A new transfer" };
    service.create(createObj).subscribe(res => {
      expect(res.amount).toBe(100); 
     }); 
    const req = httpTestingController.expectOne('http://localhost:3000/transfer', 'post to api');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(createObj);
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(createObj);
    httpTestingController.verify();
    
   });
  
});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
