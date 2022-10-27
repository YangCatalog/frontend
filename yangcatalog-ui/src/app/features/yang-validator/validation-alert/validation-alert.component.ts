import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'yc-validation-alert',
  templateUrl: './validation-alert.component.html',
  styleUrls: ['./validation-alert.component.scss']
})
export class ValidationAlertComponent implements OnInit {

  @Input() alert: any;
  displayed = true;

  constructor() { }

  ngOnInit(): void {
  }

  onCloseAlert() {
    this.alert = null;
  }
}
