import { Injectable } from '@angular/core';
import { Test1Service } from './test1.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private test1:Test1Service) { }
}
