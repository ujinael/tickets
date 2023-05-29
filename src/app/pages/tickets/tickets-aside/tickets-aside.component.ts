import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { IMenuType } from '../entities/menu_type.entity';
import { ITourTypeSelect } from '../entities';
import {TiсketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service"
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-tickets-aside',
  templateUrl: './tickets-aside.component.html',
  styleUrls: ['./tickets-aside.component.scss'],
})
export class TicketsAsideComponent implements OnInit {

  constructor(
    private readonly ticketService:TiсketsStorageService,
    private readonly messageService: MessageService
  ) { }
    menuTypes: IMenuType[];
    tourTypes: ITourTypeSelect[] = [
      {label: 'Все', value: 'all'},
      {label: 'Одиночный', value: 'single'},
      {label: 'Групповой', value: 'multi'}
    ]

  selectedMenuType: IMenuType
@Output() updateSelectedMenuType:EventEmitter<IMenuType> = new EventEmitter()
  ngOnInit(): void {
      this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ]
  
  }
  onInitTours():void {
    try {
      this.ticketService.initTours().subscribe(tours=>{
  if(tours.length){
    this.ticketService.updateTourList(tours)
    this.messageService.add({
      closable: true,
      severity:'succes',
      summary: `туры заполнены`,
    });
  
  }
  else throw Error("туры не заполнены")
  })
    } catch (error) {
      this.messageService.add({
        closable: true,
        severity:'warn',
        summary: (<Error>error).message,
      });
    }
  
  }
  onRemoveTours():void {
    try {
      this.ticketService.removeTours().subscribe(tours=>{
        this.ticketService.updateTourList([])

    this.messageService.add({
      closable: true,
      severity:'succes',
      summary: `туры удалены`,
    });
  })
    } catch (error) {
      this.messageService.add({
        closable: true,
        severity:'warn',
        summary: (<Error>error).message,
      });
    }
  
  }
onChangeSelectedMenuType(event:{value:IMenuType} ){
this.updateSelectedMenuType.emit(event.value)

}

changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
  this.ticketService.updateTour(ev.value)
}
selectDate(ev: string) {
  console.log('ev', ev)
  this.ticketService.updateTour({label:'',value:'',date:ev})
}
initRestError(): void {
  this.ticketService.getError().subscribe((data) => {}, (err)=> {
    console.log('err', err.message)
    this.messageService.add({
      closable: true,
      severity:'error',
      summary: `Error`,
      detail:`${err.message}`
    });
  });
 }
}
