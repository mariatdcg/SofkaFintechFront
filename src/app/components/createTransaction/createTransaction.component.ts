import { Component, inject, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IDialogData } from '../../interfaces/Transaction.interface';
import {NgIf } from '@angular/common';

@Component({
  selector: 'app-createTransaction',
  templateUrl: './createTransaction.component.html',
    imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    NgIf
  ],
  standalone: true
})
export class CreateTransactionComponent{

  readonly dialogRef = inject(MatDialogRef<CreateTransactionComponent>);
  readonly data = inject<IDialogData>(MAT_DIALOG_DATA);
  readonly amount = model(this.data.amount);

  closeDialog(): void {
    this.dialogRef.close();
  }

}
