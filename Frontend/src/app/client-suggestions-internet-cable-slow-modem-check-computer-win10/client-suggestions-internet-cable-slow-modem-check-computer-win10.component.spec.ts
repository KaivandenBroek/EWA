import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetCableSlowModemCheckComputerWin10Component } from './client-suggestions-internet-cable-slow-modem-check-computer-win10.component';

describe('ClientSuggestionsInternetCableSlowModemCheckComputerWin10Component', () => {
  let component: ClientSuggestionsInternetCableSlowModemCheckComputerWin10Component;
  let fixture: ComponentFixture<ClientSuggestionsInternetCableSlowModemCheckComputerWin10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetCableSlowModemCheckComputerWin10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetCableSlowModemCheckComputerWin10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
