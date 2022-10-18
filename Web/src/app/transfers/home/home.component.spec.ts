import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { HomeComponent } from './home.component';

export class MockNgbModalRef {
  componentInstance = {
      prompt: undefined,
      title: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve(true));
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let ngbModal: NgbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[StoreModule.forRoot({},{}),NgbModule],
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    ngbModal = TestBed.get(NgbModal);
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  

});
