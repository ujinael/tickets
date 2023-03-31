import { Component, OnInit, Input } from '@angular/core';
import { Tour } from '../entities';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss']
})
export class TicketCardComponent implements OnInit {
@Input() tour:Tour

  constructor() { }

  ngOnInit(): void {
  }

}
