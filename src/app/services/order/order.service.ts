import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { IOrder, Order } from 'src/app/entities/order.entity';
import { Observable, lastValueFrom } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Array<Order>;
  
  constructor(private readonly restService: RestService,
    private readonly userService: UserService,
    ) {}
 
  setOrders(orders:Order[]){
this.orders = orders
  }
 getOrders(){
    return this.orders
 }
fethOrders():Observable<IOrder[]>{
  try {
    const user = this.userService.getUser()
    if(!user) throw Error("You must enter!!!")
        return this.restService.fetchOrders(user.id)
  } catch (error) {
throw error
  }
 }
 async createOrder(order:IOrder):Promise<IOrder>{
   return await lastValueFrom(this.restService.createOrder(order))
 }
}
