import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GbillingsComponent } from './gbillings.component';

describe('GbillingsComponent', () => {
  let component: GbillingsComponent;
  let fixture: ComponentFixture<GbillingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GbillingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GbillingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
