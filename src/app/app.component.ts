import { Component } from '@angular/core';
import { ConfigService } from './services/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ticketSales2022';
constructor(
  private readonly configService:ConfigService
){
  this.configService.configLoad()
}

}
