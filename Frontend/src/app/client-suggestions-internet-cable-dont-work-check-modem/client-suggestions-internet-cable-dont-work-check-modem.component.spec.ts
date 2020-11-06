import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetCableDontWorkCheckModemComponent } from './client-suggestions-internet-cable-dont-work-check-modem.component';

describe('ClientSuggestionsInternetCableDontWorkCheckModemComponent', () => {
  let component: ClientSuggestionsInternetCableDontWorkCheckModemComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetCableDontWorkCheckModemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetCableDontWorkCheckModemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetCableDontWorkCheckModemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
