import { Component, OnInit, Input } from '@angular/core';
import { Tour } from '../entities';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss']
})
export class TicketCardComponent implements OnInit {
@Input() tour:Tour

  constructor(
   private readonly configService:ConfigService
  ) { }
getImagePath(){
  if(this.tour.img.includes("img",0))return `${this.configService.getConfig().backendHost}:${
    this.configService.getConfig().backendPort
  }/public/${this.tour.img}`
  else return `./assets/images/${this.tour.img}`
}
  ngOnInit(): void {
  }

}
