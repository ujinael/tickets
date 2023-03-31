import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  testProp:string = "Its simple test prop"
  constructor(private readonly messageService:MessageService) { }

  ngOnInit(): void {
  }

}
