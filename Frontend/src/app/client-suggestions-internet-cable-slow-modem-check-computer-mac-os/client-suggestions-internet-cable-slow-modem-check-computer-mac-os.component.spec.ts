import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetCableSlowModemCheckComputerMacOSComponent } from './client-suggestions-internet-cable-slow-modem-check-computer-mac-os.component';

describe('ClientSuggestionsInternetCableSlowModemCheckComputerMacOSComponent', () => {
  let component: ClientSuggestionsInternetCableSlowModemCheckComputerMacOSComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetCableSlowModemCheckComputerMacOSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetCableSlowModemCheckComputerMacOSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetCableSlowModemCheckComputerMacOSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
