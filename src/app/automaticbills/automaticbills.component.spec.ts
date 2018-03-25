import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticbillsComponent } from './automaticbills.component';

describe('AutomaticbillsComponent', () => {
  let component: AutomaticbillsComponent;
  let fixture: ComponentFixture<AutomaticbillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomaticbillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomaticbillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
