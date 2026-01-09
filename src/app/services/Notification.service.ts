import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

 private snackBar = inject(MatSnackBar);

  private defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  showSuccess(message: string, action: string = 'OK', config?: MatSnackBarConfig): void {
    const mergedConfig = {
      ...this.defaultConfig,
      ...config,
      panelClass: ['success-snackbar']
    };

    this.snackBar.open(message, action, mergedConfig);
  }

  showError(message: string, action: string = 'Cerrar', config?: MatSnackBarConfig): void {
    const mergedConfig = {
      ...this.defaultConfig,
      ...config,
      panelClass: ['error-snackbar'],
      duration: 5000 
    };

    this.snackBar.open(message, action, mergedConfig);
  }

  showInfo(message: string, action: string = 'OK', config?: MatSnackBarConfig): void {
    const mergedConfig = {
      ...this.defaultConfig,
      ...config,
      panelClass: ['info-snackbar']
    };

    this.snackBar.open(message, action, mergedConfig);
  }
}
