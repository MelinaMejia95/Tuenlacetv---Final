import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdvancepaymentsComponent } from './advancepayments.component';
import { HttpModule, Http } from '@angular/http';
import {  AdPaymentsFilterPipe } from './adpayments-filter.pipe'
import { AppGlobals } from '../shared/app.global';
import { PaymentsService } from "../services/payment.service";
import { PaginationInstance, NgxPaginationModule } from '../../../node_modules/ngx-pagination';
import swal from 'sweetalert2';

describe('AdvancepaymentsComponent', () => {
  let component: AdvancepaymentsComponent;
  let fixture: ComponentFixture<AdvancepaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, NgxPaginationModule, HttpModule ],
      declarations: [ AdvancepaymentsComponent, AdPaymentsFilterPipe ],
      providers: [ PaymentsService, AppGlobals ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    //component = new AdvancepaymentsComponent();
    //component.paymentEdit.id = 6;
    fixture = TestBed.createComponent(AdvancepaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //component.paymentEdit = {'id': 12}
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete', () => {
    component.selectData({'id': 12});
    //console.log(component.paymentEdit)
    component.deletePayment();
    // component.paymentEdit.id = 9
    //component.paymentEdit.id = 6;
    //const result = component.deletePayment();
    expect(component.result).toEqual(1)
  })
});

/* describe('Delete Payment', () => {
  const component: AdvancepaymentsComponent;
  let expected = '';

  it('should delete', () => {
    expect
  })
}) */
