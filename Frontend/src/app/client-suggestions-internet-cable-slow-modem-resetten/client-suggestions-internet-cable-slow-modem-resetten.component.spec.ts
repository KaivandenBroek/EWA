import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetCableSlowModemResettenComponent } from './client-suggestions-internet-cable-slow-modem-resetten.component';

describe('ClientSuggestionsInternetCableSlowModemResettenComponent', () => {
  let component: ClientSuggestionsInternetCableSlowModemResettenComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetCableSlowModemResettenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetCableSlowModemResettenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetCableSlowModemResettenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
