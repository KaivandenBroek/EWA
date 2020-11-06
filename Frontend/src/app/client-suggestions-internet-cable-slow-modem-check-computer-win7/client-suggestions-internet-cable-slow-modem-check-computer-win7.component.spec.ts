import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetCableSlowModemCheckComputerWin7Component } from './client-suggestions-internet-cable-slow-modem-check-computer-win7.component';

describe('ClientSuggestionsInternetCableSlowModemCheckComputerWin7Component', () => {
  let component: ClientSuggestionsInternetCableSlowModemCheckComputerWin7Component;
  let fixture: ComponentFixture<ClientSuggestionsInternetCableSlowModemCheckComputerWin7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetCableSlowModemCheckComputerWin7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetCableSlowModemCheckComputerWin7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
