import { Component, OnInit } from '@angular/core';
import {StatisticService} from "../../../../services/statistic/statistic.service";
import {IStatisticUser} from "../../entities/statistic.entity";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  constructor(private readonly statisticServer:StatisticService) { }
usersStatistic:IStatisticUser[]
  ngOnInit(): void {
    this.statisticServer.getUserStatistic().subscribe(users=>{
      this.usersStatistic = users

    })
  }

}
