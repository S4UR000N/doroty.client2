import { Injectable } from '@angular/core';
import Alert from '../type/alert.type';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor() {}

  showAlert(type: Alert, message: string): void {
    let alertContainer: HTMLElement = document.getElementById(`app-alert-${type}`)!;
    let alert: HTMLElement = document.getElementById(`alert-${type}`)!;

    alertContainer.classList.toggle('hidden');
    alert.innerHTML = message;
    setTimeout(() => {
      alertContainer.classList.toggle('hidden');
    }, 2500);
  }
}
