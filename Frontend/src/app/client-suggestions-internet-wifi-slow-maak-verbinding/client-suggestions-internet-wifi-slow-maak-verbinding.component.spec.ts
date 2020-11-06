import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetWifiSlowMaakVerbindingComponent } from './client-suggestions-internet-wifi-slow-maak-verbinding.component';

describe('ClientSuggestionsInternetWifiSlowMaakVerbindingComponent', () => {
  let component: ClientSuggestionsInternetWifiSlowMaakVerbindingComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetWifiSlowMaakVerbindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetWifiSlowMaakVerbindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetWifiSlowMaakVerbindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
