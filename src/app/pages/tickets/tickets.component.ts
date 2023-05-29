import { Component, OnInit } from '@angular/core';
import { IMenuType } from './entities/menu_type.entity';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
shortMenu:boolean = true

  constructor() { }
onChangeMenuStatus(menuType:IMenuType){
  this.shortMenu = menuType.type === 'custom'?true:false
}
  ngOnInit(): void {
  }

}
