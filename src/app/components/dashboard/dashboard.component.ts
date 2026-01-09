import {afterNextRender, Component, Inject, OnDestroy,  PLATFORM_ID, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {ITransaction } from '../../interfaces/Transaction.interface';
import {MatButtonModule} from '@angular/material/button';
import {TransactionService } from '../../services/Transaction.service';
import {MatDialog} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule } from '@angular/forms';
import {CreateTransactionComponent } from '../createTransaction/createTransaction.component';
import {CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import {NotificationService } from '../../services/Notification.service';
import {  Subscription, timer } from 'rxjs';
import { TransactionStreamService } from '../../services/TransactionStream.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [MatFormFieldModule, MatInputModule, MatTableModule,FormsModule, MatButtonModule,DatePipe,CurrencyPipe],   
    providers: [TransactionService],
    standalone: true
})
export class DashboardComponent implements  OnDestroy {

  protected arrTransactions: ITransaction[] =[];
  protected displayedColumns: string[] = ['id', 'amount', 'commission', 'creationDate'];
  protected amountNewTransaction!: number;
  protected mostrarDialogoAgregar = false;
  readonly newAmount = signal('');
  private sseSubscription?: Subscription;
  private refreshSub?: Subscription;

  constructor(private readonly transactionService: TransactionService,
    private readonly transactionStreamService: TransactionStreamService,
    private readonly dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object,
    private readonly notificationService: NotificationService) {
       
        afterNextRender(() => {
          if (isPlatformBrowser(this.platformId)) {          
                this.startAutoRefresh();
          }
        });
    }


  connectStream(): void {
    this.sseSubscription = this.transactionStreamService
      .streamTransactions()
      .subscribe(transaction => {
        console.log('transaction por stream', transaction);
        if (transaction) {
          this.arrTransactions = [...this.arrTransactions, transaction];
        }
      });
  }

  reconnectStream(): void {
    this.sseSubscription?.unsubscribe();
    this.arrTransactions = [];
    this.connectStream();
  }

  ngOnDestroy(): void {
    this.sseSubscription?.unsubscribe();
    this.refreshSub?.unsubscribe();
  }

  private startAutoRefresh(): void {

    this.connectStream();
    this.refreshSub = timer(60000, 60000).subscribe(() => {
      this.reconnectStream();
    });
  }


  getTransactions(){
    
     this.transactionService.getTransactions().subscribe({  next: (transactions: ITransaction[]) => {      
        this.arrTransactions = transactions;
       
    }, error: (error: any) => {
      
        this.arrTransactions = [];
        console.log(error);
         this.notificationService.showError( 'Error al consultar las transacciones','Reintentar');
    }
  });
  }

    openDialog(): void {
    const dialogRef = this.dialog.open(  CreateTransactionComponent, {
        height: '300px',
        width: '400px',
        data: {amount: this.newAmount()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Se cerró el dialogo: ', result); 
      if (result !== undefined) {
        this.amountNewTransaction = result;
        this.createTransaction();
      }
    });
  }

  createTransaction() {
     console .log("Monto de la transacción a crear: ", this.amountNewTransaction);
      this.transactionService.createTransaction(this.amountNewTransaction).subscribe( {  next: (transaction: ITransaction) => {
        this.getTransactions();
        this.amountNewTransaction = 0;
        this.mostrarDialogoAgregar = false;
         this.notificationService.showSuccess(
            '¡Transacción guardada exitosamente!','Cerrar', 
            {
              duration: 4000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            }
          );
      }, error: (error: any) => {
         console.log(error);
         this.notificationService.showError( 'Error al guardar la transacción','Reintentar' );
      }
  }); 
  }

}
