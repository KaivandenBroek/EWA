import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetCableDontWorkComponent } from './client-suggestions-internet-cable-dont-work.component';

describe('ClientSuggestionsInternetCableDontWorkComponent', () => {
  let component: ClientSuggestionsInternetCableDontWorkComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetCableDontWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetCableDontWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetCableDontWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
