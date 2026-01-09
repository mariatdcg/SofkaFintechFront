
import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { ITransaction } from '../interfaces/Transaction.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TransactionStreamService {

 private readonly url = 'http://localhost:8080/api/sofka-fintech/transactions/stream';

  constructor(
    private zone: NgZone, @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  streamTransactions(): Observable<ITransaction> {

    if (!isPlatformBrowser(this.platformId)) {
      return new Observable(); 
    }

    return new Observable(observer => {
      const eventSource = new EventSource(this.url);

      eventSource.addEventListener('transaction', (event: MessageEvent) => {
        this.zone.run(() => {
          observer.next(JSON.parse(event.data));
        });
      });

      eventSource.onerror = error => {
        this.zone.run(() => observer.error(error));
        eventSource.close();
      };

      return () => eventSource.close();
    });
  }
}
