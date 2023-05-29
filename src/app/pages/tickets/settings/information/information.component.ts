import { Component, OnInit } from '@angular/core';
import {User} from "../../../auth/entities/users.entity";
import {UserService} from "../../../../services/user/user.service";
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
user?:User
  constructor( private  readonly userService:UserService,
    private readonly ticketService: TiсketsStorageService,
    private readonly messageService: MessageService

    ) {
 this.user = this.userService.getUser()
  }
onInitTours():void {
  try {
    this.ticketService.initTours().subscribe(tours=>{
if(tours.length){
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
  ngOnInit(): void {

  }

}
