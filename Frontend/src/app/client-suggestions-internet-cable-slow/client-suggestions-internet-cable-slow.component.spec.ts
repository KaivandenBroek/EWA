import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetCableSlowComponent } from './client-suggestions-internet-cable-slow.component';

describe('ClientSuggestionsInternetCableSlowComponent', () => {
  let component: ClientSuggestionsInternetCableSlowComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetCableSlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetCableSlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetCableSlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
