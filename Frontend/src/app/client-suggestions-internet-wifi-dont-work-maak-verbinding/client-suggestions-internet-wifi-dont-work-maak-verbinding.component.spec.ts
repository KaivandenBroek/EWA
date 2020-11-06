import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetWifiDontWorkMaakVerbindingComponent } from './client-suggestions-internet-wifi-dont-work-maak-verbinding.component';

describe('ClientSuggestionsInternetWifiDontWorkMaakVerbindingComponent', () => {
  let component: ClientSuggestionsInternetWifiDontWorkMaakVerbindingComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetWifiDontWorkMaakVerbindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetWifiDontWorkMaakVerbindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetWifiDontWorkMaakVerbindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
