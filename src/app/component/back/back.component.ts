import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-back',
  standalone: true,
  imports: [],
  templateUrl: './back.component.html',
  styleUrl: './back.component.scss'
})
export class BackComponent {
  public constructor(private location: Location) {}

  public back(): void {
    this.location.back();
  }
}
