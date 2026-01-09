import { Injectable,    inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ITransaction } from '../interfaces/Transaction.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
    private readonly http = inject(HttpClient);
    
    private readonly url = 'http://localhost:8080/api/sofka-fintech/transactions';

   
    constructor(     ) {}


    getTransactions(): Observable<ITransaction[]> {
        return this.http.get<ITransaction[]>(this.url);
        
    }

    createTransaction(amountNewTransaction: number):Observable<ITransaction> {
        return this.http.post<ITransaction>(this.url, {amount: amountNewTransaction});
  }
  

 
}
