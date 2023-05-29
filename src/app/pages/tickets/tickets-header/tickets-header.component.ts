import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../auth/entities/users.entity';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tickets-header',
  templateUrl: './tickets-header.component.html',
  styleUrls: ['./tickets-header.component.scss'],
})
export class TicketsHeaderComponent implements OnInit,OnDestroy {
  user: User | undefined;
  constructor(private readonly userService: UserService) {}
@Input() shortMenu:boolean
currentDate:Date = new Date()
  items: MenuItem[];
timer:any 
 ngOnDestroy(): void {
   clearInterval(this.timer)
  }
  
  ngOnInit() {
    this.user = this.userService.getUser();
this.timer = setInterval(()=>{
this.currentDate = new Date()
},1000)
    this.items = [
      {
        label: 'User',
        icon: 'pi pi-fw pi-user',
        items: [{ label: 'Logout' ,routerLink:'/auth'}],
      },
      {
        label: 'Tickets',
        icon: 'pi pi-fw pi-calendar',
        routerLink:'list'
      },
      {
        label: 'Orders',
        icon: 'pi pi-fw pi-list',
        routerLink:'orders'

      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-settings',
        routerLink:'settings'

      },
    ]
  }
  getFilteredMenuItems(){

return this.items.filter((value)=>{
      if(value.label === 'Settings'){
if(this.shortMenu) return false
return true
      }
      return true
    });

  }
}

