import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetWifiDontWorkModemResettenComponent } from './client-suggestions-internet-wifi-dont-work-modem-resetten.component';

describe('ClientSuggestionsInternetWifiDontWorkModemResettenComponent', () => {
  let component: ClientSuggestionsInternetWifiDontWorkModemResettenComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetWifiDontWorkModemResettenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetWifiDontWorkModemResettenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetWifiDontWorkModemResettenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
