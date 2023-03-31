import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsAsideComponent } from './tickets-aside.component';

describe('TicketsAsideComponent', () => {
  let component: TicketsAsideComponent;
  let fixture: ComponentFixture<TicketsAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsAsideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
