import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-success',
  templateUrl: './alert-success.component.html',
  styleUrls: ['./alert-success.component.css'],
})
export class AlertSuccessComponent implements OnInit {
  @Input() successMessage: string;
  constructor() {}

  ngOnInit(): void {}
}
