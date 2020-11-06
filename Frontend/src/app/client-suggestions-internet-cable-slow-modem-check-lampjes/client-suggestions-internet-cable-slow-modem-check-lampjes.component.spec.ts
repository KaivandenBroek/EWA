import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetCableSlowModemCheckLampjesComponent } from './client-suggestions-internet-cable-slow-modem-check-lampjes.component';

describe('ClientSuggestionsInternetCableSlowModemCheckLampjesComponent', () => {
  let component: ClientSuggestionsInternetCableSlowModemCheckLampjesComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetCableSlowModemCheckLampjesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetCableSlowModemCheckLampjesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetCableSlowModemCheckLampjesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
