import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsTelephonyComponent } from './client-suggestions-telephony.component';

describe('ClientSuggestionsTelephonyComponent', () => {
  let component: ClientSuggestionsTelephonyComponent;
  let fixture: ComponentFixture<ClientSuggestionsTelephonyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsTelephonyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsTelephonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
