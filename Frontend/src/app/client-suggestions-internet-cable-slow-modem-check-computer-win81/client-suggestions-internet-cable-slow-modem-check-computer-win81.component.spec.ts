import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetCableSlowModemCheckComputerWin81Component } from './client-suggestions-internet-cable-slow-modem-check-computer-win81.component';

describe('ClientSuggestionsInternetCableSlowModemCheckComputerWin81Component', () => {
  let component: ClientSuggestionsInternetCableSlowModemCheckComputerWin81Component;
  let fixture: ComponentFixture<ClientSuggestionsInternetCableSlowModemCheckComputerWin81Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetCableSlowModemCheckComputerWin81Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetCableSlowModemCheckComputerWin81Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
