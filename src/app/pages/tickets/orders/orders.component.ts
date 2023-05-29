import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IOrder } from 'src/app/entities/order.entity';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit,OnDestroy {

  constructor(
    private readonly orderService:OrderService,
    private readonly messageService:MessageService,

  ) { }

orderList:Array<IOrder> = []
subscription:Subscription
  ngOnInit(): void {
    try {
    this.subscription =  this.orderService.fethOrders().subscribe((orders)=>{
this.orderService.setOrders(orders)
this.orderList = orders

    })
    } catch (error) {
      this.messageService.add({
        severity:'warn',
        closable:true,
        summary:(<Error>error).message
        
      })
    }
  }
  ngOnDestroy(): void {
this.subscription.unsubscribe()
  }
}
