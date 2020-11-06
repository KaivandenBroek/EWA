import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {FlatpickrModule} from 'angularx-flatpickr';
import {ChartsModule} from 'ng2-charts';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {BsDatepickerModule, ModalModule} from 'ngx-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatSelectModule} from '@angular/material/select';
import {AppComponent} from './app.component';
import {routing} from './app.routing';

// helpers
import {JwtInterceptor, ErrorInterceptor} from './helpers';
import {NgFlashMessagesModule} from 'ng-flash-messages';
import {AlertComponent} from './alert';

// general pages
import {HeaderComponent} from './header';
import {FooterComponent} from './footer';
import {LandingComponent} from './LandingPage';
import {LoginComponent} from './login';

// import for clients
import {ClientsComponent} from './clients';
import {RegisterComponent} from './register/register.component';
import {ClientDashboardComponent} from './client-dashboard';
import {ChatDialogComponent} from './chat/chat-dialog/chat-dialog.component';
import {EditClientComponent} from './edit-client/edit-client.component';
import {ClientEditComponent} from './client-edit/client-edit.component';
import {ClientSuggestionsComponent} from './client-suggestions';
import {ClientSuggestionsMobileComponent} from './client-suggestions-mobile';
import {ClientSuggestionsInternetComponent} from './client-suggestions-internet';
import {ClientSuggestionsInteractiveTvComponent} from './client-suggestions-interactive-tv';
import {ClientSuggestionsTelephonyComponent} from './client-suggestions-telephony';
import {ClientSuggestionsInternetWifiSlowComponent} from './client-suggestions-internet-wifi-slow';
import {ClientSuggestionsInternetWifiDontWorkComponent} from './client-suggestions-internet-wifi-dont-work';
import {ClientSuggestionsInternetCableSlowComponent} from './client-suggestions-internet-cable-slow';
import {ClientSuggestionsInternetCableDontWorkComponent} from './client-suggestions-internet-cable-dont-work';
import {ClientSuggestionsInternetCableSlowModemResettenComponent} from './client-suggestions-internet-cable-slow-modem-resetten';
import {ClientSuggestionsInternetCableSlowModemCheckLampjesComponent} from './client-suggestions-internet-cable-slow-modem-check-lampjes';
import {ClientSuggestionsInternetCableSlowModemCheckComputerComponent} from './client-suggestions-internet-cable-slow-modem-check-computer';
import {ClientSuggestionsInternetCableSlowModemCheckComputerWin10Component} from './client-suggestions-internet-cable-slow-modem-check-computer-win10';
import {ClientSuggestionsInternetCableSlowModemCheckComputerWin7Component} from './client-suggestions-internet-cable-slow-modem-check-computer-win7';
import {ClientSuggestionsInternetCableSlowModemCheckComputerMacOSComponent} from './client-suggestions-internet-cable-slow-modem-check-computer-mac-os';
import {ClientSuggestionsInternetCableDontWorkCheckModemComponent} from './client-suggestions-internet-cable-dont-work-check-modem';
import {ClientSuggestionsInternetCableDontWorkModemResettenComponent} from './client-suggestions-internet-cable-dont-work-modem-resetten';
import {ClientSuggestionsInternetCableDontWorkControleerComputerComponent} from './client-suggestions-internet-cable-dont-work-controleer-computer';
import {ClientSuggestionsInternetCableSlowModemCheckComputerWin81Component} from './client-suggestions-internet-cable-slow-modem-check-computer-win81';
import {ClientSuggestionsInternetWifiSlowModemResettenComponent} from './client-suggestions-internet-wifi-slow-modem-resetten';
import {ClientSuggestionsInternetWifiSlowModemCheckComponent} from './client-suggestions-internet-wifi-slow-modem-check';
import {ClientSuggestionsInternetWifiSlowMaakVerbindingComponent} from './client-suggestions-internet-wifi-slow-maak-verbinding';
import {ClientSuggestionsInternetWifiDontWorkModemResettenComponent} from './client-suggestions-internet-wifi-dont-work-modem-resetten';
import {ClientSuggestionsInternetWifiDontWorkModemCheckComponent} from './client-suggestions-internet-wifi-dont-work-modem-check';
import {ClientSuggestionsInternetWifiDontWorkMaakVerbindingComponent} from './client-suggestions-internet-wifi-dont-work-maak-verbinding';

// import for employee
import {EmployeeDashboardComponent} from './employee-dashboard';
import {EmployeesComponent} from './employees';
import {EmployeeChatComponent} from './employee-chat/employee-chat.component';
import {EmployeeChatSidebarComponent} from './employee-chat-sidebar/employee-chat-sidebar.component';

// import for admin
import {AdminDashboardComponent} from './admin-dashboard';
import {AdminStatisticsComponent} from './admin-statistics/admin-statistics.component';
import {AdminCreateEmployeeComponent} from './admin-create-employee/admin-create-employee.component';
import {AdminEditEmployeeComponent} from './admin-edit-employee/admin-edit-employee.component';

// import for services
import {CurrentIssueService} from './services';
import {StatsService} from './services';
import {ChartService} from './services';
import {ApiService} from './core/api.service';

// import models
import {Modem} from './models';
import {Stats} from './models';
import {Issue} from './models';
import {Tag} from './models';

@NgModule({
  imports: [
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserModule,
    CommonModule,
    ChartsModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    NgFlashMessagesModule.forRoot(),
    MatFormFieldModule,
    NgxPaginationModule,
    MatSelectModule,
    ModalModule
  ],
  declarations: [
    AlertComponent,
    ChatDialogComponent,
    AppComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    ClientDashboardComponent,
    ClientSuggestionsComponent,
    ClientSuggestionsMobileComponent,
    AdminDashboardComponent,
    AdminStatisticsComponent,
    EmployeeDashboardComponent,
    EmployeeChatComponent,
    EmployeeChatSidebarComponent,
    AdminCreateEmployeeComponent,
    AdminEditEmployeeComponent,
    ClientSuggestionsInternetComponent,
    ClientSuggestionsInteractiveTvComponent,
    ClientSuggestionsTelephonyComponent,
    ClientSuggestionsInternetWifiSlowComponent,
    ClientSuggestionsInternetWifiDontWorkComponent,
    ClientSuggestionsInternetCableSlowComponent,
    ClientSuggestionsInternetCableDontWorkComponent,
    ClientsComponent,
    EditClientComponent,
    EmployeesComponent,
    ClientSuggestionsInternetCableSlowModemResettenComponent,
    ClientSuggestionsInternetCableSlowModemCheckLampjesComponent,
    ClientSuggestionsInternetCableSlowModemCheckComputerComponent,
    ClientSuggestionsInternetCableSlowModemCheckComputerWin10Component,
    ClientSuggestionsInternetCableSlowModemCheckComputerWin7Component,
    ClientSuggestionsInternetCableSlowModemCheckComputerMacOSComponent,
    ClientSuggestionsInternetCableDontWorkCheckModemComponent,
    ClientSuggestionsInternetCableDontWorkModemResettenComponent,
    ClientSuggestionsInternetCableDontWorkControleerComputerComponent,
    ClientSuggestionsInternetCableSlowModemCheckComputerWin81Component,
    ClientSuggestionsInternetWifiSlowModemResettenComponent,
    ClientSuggestionsInternetWifiSlowModemCheckComponent,
    ClientSuggestionsInternetWifiSlowMaakVerbindingComponent,
    ClientSuggestionsInternetWifiDontWorkModemResettenComponent,
    ClientSuggestionsInternetWifiDontWorkModemCheckComponent,
    ClientSuggestionsInternetWifiDontWorkMaakVerbindingComponent,
    ClientEditComponent
  ],
  providers: [
    ApiService, Tag, CurrentIssueService, Issue, Stats, StatsService, Modem, ChartService, AlertComponent,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
