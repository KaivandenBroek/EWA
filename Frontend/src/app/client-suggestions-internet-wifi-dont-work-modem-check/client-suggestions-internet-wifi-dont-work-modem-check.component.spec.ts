import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetWifiDontWorkModemCheckComponent } from './client-suggestions-internet-wifi-dont-work-modem-check.component';

describe('ClientSuggestionsInternetWifiDontWorkModemCheckComponent', () => {
  let component: ClientSuggestionsInternetWifiDontWorkModemCheckComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetWifiDontWorkModemCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetWifiDontWorkModemCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetWifiDontWorkModemCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
