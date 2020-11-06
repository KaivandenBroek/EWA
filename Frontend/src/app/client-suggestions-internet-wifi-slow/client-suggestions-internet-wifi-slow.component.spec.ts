import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetWifiSlowComponent } from './client-suggestions-internet-wifi-slow.component';

describe('ClientSuggestionsInternetWifiSlowComponent', () => {
  let component: ClientSuggestionsInternetWifiSlowComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetWifiSlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetWifiSlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetWifiSlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
