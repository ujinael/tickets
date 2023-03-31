import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { IMenuType } from '../entities/menu_type.entity';

@Component({
  selector: 'app-tickets-aside',
  templateUrl: './tickets-aside.component.html',
  styleUrls: ['./tickets-aside.component.scss']
})
export class TicketsAsideComponent implements OnInit {
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType
  constructor() { }
@Output() updateSelectedMenuType:EventEmitter<IMenuType> = new EventEmitter()
  ngOnInit(): void {
      this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ]
  }

onChangeSelectedMenuType(event:{value:IMenuType} ){
this.updateSelectedMenuType.emit(event.value)

}
}
