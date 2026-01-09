/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTransactionComponent } from './createTransaction.component';

describe('CreateTransactionComponent', () => {
  let component: CreateTransactionComponent;
  let fixture: ComponentFixture<CreateTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
