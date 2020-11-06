import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetWifiSlowModemResettenComponent } from './client-suggestions-internet-wifi-slow-modem-resetten.component';

describe('ClientSuggestionsInternetWifiSlowModemResettenComponent', () => {
  let component: ClientSuggestionsInternetWifiSlowModemResettenComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetWifiSlowModemResettenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetWifiSlowModemResettenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetWifiSlowModemResettenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
