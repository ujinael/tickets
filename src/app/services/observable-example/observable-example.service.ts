import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableExampleService {
exampleSubject:Subject<string> = new Subject<string>()
  constructor() { }
  getSubject():Subject<string>{
    return this.exampleSubject
  }
}
