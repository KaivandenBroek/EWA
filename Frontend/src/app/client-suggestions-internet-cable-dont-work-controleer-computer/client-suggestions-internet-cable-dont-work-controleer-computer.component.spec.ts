import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuggestionsInternetCableDontWorkControleerComputerComponent } from './client-suggestions-internet-cable-dont-work-controleer-computer.component';

describe('ClientSuggestionsInternetCableDontWorkControleerComputerComponent', () => {
  let component: ClientSuggestionsInternetCableDontWorkControleerComputerComponent;
  let fixture: ComponentFixture<ClientSuggestionsInternetCableDontWorkControleerComputerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSuggestionsInternetCableDontWorkControleerComputerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuggestionsInternetCableDontWorkControleerComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
