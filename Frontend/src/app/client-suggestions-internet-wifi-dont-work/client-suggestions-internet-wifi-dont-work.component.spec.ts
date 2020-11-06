import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetWifiDontWorkComponent } from './client-suggestions-internet-wifi-dont-work.component';

describe('ClientSuggestionsInternetWifiDontWorkComponent', () => {
  let component: ClientSuggestionsInternetWifiDontWorkComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetWifiDontWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetWifiDontWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetWifiDontWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
