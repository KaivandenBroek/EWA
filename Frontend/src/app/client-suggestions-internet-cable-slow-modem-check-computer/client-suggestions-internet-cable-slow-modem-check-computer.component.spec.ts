import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetCableSlowModemCheckComputerComponent } from './client-suggestions-internet-cable-slow-modem-check-computer.component';

describe('ClientSuggestionsInternetCableSlowModemCheckComputerComponent', () => {
  let component: ClientSuggestionsInternetCableSlowModemCheckComputerComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetCableSlowModemCheckComputerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetCableSlowModemCheckComputerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetCableSlowModemCheckComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
