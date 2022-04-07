import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-history-modal',
  templateUrl: './check-history-modal.component.html',
  styleUrls: ['./check-history-modal.component.css']
})
export class CheckHistoryModalComponent implements OnInit {
  @Input() shipmentHistory: any;
  @Input() uid: number;

  constructor() { }

  ngOnInit(): void {
  }

  isObject(obj: any): boolean {
    return typeof obj === 'object';
  }

}
