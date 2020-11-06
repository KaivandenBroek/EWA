import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetComponent } from './client-suggestions-internet.component';

describe('ClientSuggestionsInternetComponent', () => {
  let component: ClientSuggestionsInternetComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
