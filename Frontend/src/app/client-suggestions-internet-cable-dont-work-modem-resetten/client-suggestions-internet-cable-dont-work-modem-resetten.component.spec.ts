import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetCableDontWorkModemResettenComponent } from './client-suggestions-internet-cable-dont-work-modem-resetten.component';

describe('ClientSuggestionsInternetCableDontWorkModemResettenComponent', () => {
  let component: ClientSuggestionsInternetCableDontWorkModemResettenComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetCableDontWorkModemResettenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetCableDontWorkModemResettenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetCableDontWorkModemResettenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
