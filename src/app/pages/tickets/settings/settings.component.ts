import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ObservableExampleService } from 'src/app/services/observable-example/observable-example.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit,OnDestroy {
private subjectScope:Subject<string> = this.observableExampleService.getSubject()
private subjectUnsubscribe:Subscription
constructor(private readonly observableExampleService:ObservableExampleService) { }

  ngOnInit(): void {
    this.subjectScope 
this.subjectUnsubscribe = this.subjectScope.subscribe((data)=>{
  console.log(data);

  
})
  setTimeout(()=>{
  this.subjectScope.next('Hello observable')
  },1000)
  }


  ngOnDestroy(): void {
this.subjectUnsubscribe.unsubscribe()
  }
}