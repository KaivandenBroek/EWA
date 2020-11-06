import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetWifiSlowModemCheckComponent } from './client-suggestions-internet-wifi-slow-modem-check.component';

describe('ClientSuggestionsInternetWifiSlowModemCheckComponent', () => {
  let component: ClientSuggestionsInternetWifiSlowModemCheckComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetWifiSlowModemCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetWifiSlowModemCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetWifiSlowModemCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
