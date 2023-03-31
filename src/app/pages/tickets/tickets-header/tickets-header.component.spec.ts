import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsHeaderComponent } from './tickets-header.component';

describe('TicketsHeaderComponent', () => {
  let component: TicketsHeaderComponent;
  let fixture: ComponentFixture<TicketsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
