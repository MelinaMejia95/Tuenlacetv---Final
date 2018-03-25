import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancepaymentsComponent } from './advancepayments.component';

describe('AdvancepaymentsComponent', () => {
  let component: AdvancepaymentsComponent;
  let fixture: ComponentFixture<AdvancepaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancepaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancepaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
