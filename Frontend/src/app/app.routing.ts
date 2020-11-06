import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './guards';
import {Role} from './models';

// general pages
import {LandingComponent} from './LandingPage';
import {LoginComponent} from './login';

// client pages
import {ChatDialogComponent} from './chat/chat-dialog/chat-dialog.component';
import {RegisterComponent} from './register/register.component';
import {ClientsComponent} from './clients';
import {ClientEditComponent} from './client-edit/client-edit.component';
import {ClientDashboardComponent} from './client-dashboard';
import {ClientSuggestionsComponent} from './client-suggestions';
import {ClientSuggestionsMobileComponent} from './client-suggestions-mobile';
import {ClientSuggestionsInteractiveTvComponent} from './client-suggestions-interactive-tv';
import {ClientSuggestionsTelephonyComponent} from './client-suggestions-telephony';
import {ClientSuggestionsInternetComponent} from './client-suggestions-internet';
import {ClientSuggestionsInternetWifiSlowComponent} from './client-suggestions-internet-wifi-slow';
import {ClientSuggestionsInternetWifiSlowModemCheckComponent} from './client-suggestions-internet-wifi-slow-modem-check';
import {ClientSuggestionsInternetWifiSlowModemResettenComponent} from './client-suggestions-internet-wifi-slow-modem-resetten';
import {ClientSuggestionsInternetWifiSlowMaakVerbindingComponent} from './client-suggestions-internet-wifi-slow-maak-verbinding';
import {ClientSuggestionsInternetWifiDontWorkComponent} from './client-suggestions-internet-wifi-dont-work';
import {ClientSuggestionsInternetWifiDontWorkModemCheckComponent} from './client-suggestions-internet-wifi-dont-work-modem-check';
import {ClientSuggestionsInternetWifiDontWorkModemResettenComponent} from './client-suggestions-internet-wifi-dont-work-modem-resetten';
import {ClientSuggestionsInternetWifiDontWorkMaakVerbindingComponent} from './client-suggestions-internet-wifi-dont-work-maak-verbinding';
import {ClientSuggestionsInternetCableSlowComponent} from './client-suggestions-internet-cable-slow';
import {ClientSuggestionsInternetCableDontWorkComponent} from './client-suggestions-internet-cable-dont-work';
import {ClientSuggestionsInternetCableDontWorkCheckModemComponent} from './client-suggestions-internet-cable-dont-work-check-modem';
import {ClientSuggestionsInternetCableDontWorkModemResettenComponent} from './client-suggestions-internet-cable-dont-work-modem-resetten';
import {ClientSuggestionsInternetCableDontWorkControleerComputerComponent} from './client-suggestions-internet-cable-dont-work-controleer-computer';
import {ClientSuggestionsInternetCableSlowModemResettenComponent} from './client-suggestions-internet-cable-slow-modem-resetten';
import {ClientSuggestionsInternetCableSlowModemCheckLampjesComponent} from './client-suggestions-internet-cable-slow-modem-check-lampjes';
import {ClientSuggestionsInternetCableSlowModemCheckComputerComponent} from './client-suggestions-internet-cable-slow-modem-check-computer';
import {ClientSuggestionsInternetCableSlowModemCheckComputerWin10Component} from './client-suggestions-internet-cable-slow-modem-check-computer-win10';
import {ClientSuggestionsInternetCableSlowModemCheckComputerWin81Component} from './client-suggestions-internet-cable-slow-modem-check-computer-win81';
import {ClientSuggestionsInternetCableSlowModemCheckComputerWin7Component} from './client-suggestions-internet-cable-slow-modem-check-computer-win7';
import {ClientSuggestionsInternetCableSlowModemCheckComputerMacOSComponent} from './client-suggestions-internet-cable-slow-modem-check-computer-mac-os';
import {EditClientComponent} from './edit-client/edit-client.component';

// admin pages\
import {AdminDashboardComponent} from './admin-dashboard';
import {AdminStatisticsComponent} from './admin-statistics/admin-statistics.component';
import {AdminCreateEmployeeComponent} from './admin-create-employee/admin-create-employee.component';
import {AdminEditEmployeeComponent} from './admin-edit-employee/admin-edit-employee.component';

// employee pages
import {EmployeeDashboardComponent} from './employee-dashboard';
import {EmployeeChatComponent} from './employee-chat/employee-chat.component';
import {EmployeesComponent} from './employees';

const appRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },
  {
    path: 'client-dashboard',
    component: ClientDashboardComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },
  {
    path: 'client-edit',
    component: ClientEditComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },
  {
    path: 'client-suggestions',
    component: ClientSuggestionsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },
  {
    path: 'client-suggestions-mobile',
    component: ClientSuggestionsMobileComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },
  {
    path: 'client-suggestions-interactive-tv',
    component: ClientSuggestionsInteractiveTvComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },
  {
    path: 'client-suggestions-telephony',
    component: ClientSuggestionsTelephonyComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },
  {
    path: 'client-suggestions-internet',
    component: ClientSuggestionsInternetComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },
  {
    path: 'client-suggestions-internet-wifi-slow',
    component: ClientSuggestionsInternetWifiSlowComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-wifi-slow-modem-check',
    component: ClientSuggestionsInternetWifiSlowModemCheckComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-wifi-slow-modem-resetten',
    component: ClientSuggestionsInternetWifiSlowModemResettenComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-wifi-slow-maak-verbinding',
    component: ClientSuggestionsInternetWifiSlowMaakVerbindingComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-wifi-dont-work',
    component: ClientSuggestionsInternetWifiDontWorkComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-wifi-dont-work-modem-check',
    component: ClientSuggestionsInternetWifiDontWorkModemCheckComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-wifi-dont-work-modem-resetten',
    component: ClientSuggestionsInternetWifiDontWorkModemResettenComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-wifi-dont-work-maak-verbinding',
    component: ClientSuggestionsInternetWifiDontWorkMaakVerbindingComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-cable-slow',
    component: ClientSuggestionsInternetCableSlowComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-cable-slow-modem-resetten',
    component: ClientSuggestionsInternetCableSlowModemResettenComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-cable-slow-modem-check-lampjes',
    component: ClientSuggestionsInternetCableSlowModemCheckLampjesComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-cable-slow-modem-check-computer',
    component: ClientSuggestionsInternetCableSlowModemCheckComputerComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-cable-slow-modem-check-computer-win10',
    component: ClientSuggestionsInternetCableSlowModemCheckComputerWin10Component,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-cable-slow-modem-check-computer-win81',
    component: ClientSuggestionsInternetCableSlowModemCheckComputerWin81Component,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-cable-slow-modem-check-computer-win7',
    component: ClientSuggestionsInternetCableSlowModemCheckComputerWin7Component,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-cable-slow-modem-check-computer-mac-os',
    component: ClientSuggestionsInternetCableSlowModemCheckComputerMacOSComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-cable-dont-work',
    component: ClientSuggestionsInternetCableDontWorkComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-cable-dont-work-check-modem',
    component: ClientSuggestionsInternetCableDontWorkCheckModemComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-cable-dont-work-modem-resetten',
    component: ClientSuggestionsInternetCableDontWorkModemResettenComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-suggestions-internet-cable-dont-work-controleer-computer',
    component: ClientSuggestionsInternetCableDontWorkControleerComputerComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },

  {
    path: 'client-chat',
    component: ChatDialogComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.User]}
  },
  {

    path: 'edit-client',
    component: EditClientComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Employee]}
  },

  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },
  {

    path: 'employee-dashboard',
    component: EmployeeDashboardComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Employee]}
  },
  {
    path: 'employee-chat',
    component: EmployeeChatComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Employee]}
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },
  {
    path: 'admin-statistics',
    component: AdminStatisticsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },
  {
    path: 'admin-edit-employee',
    component: AdminEditEmployeeComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },

  {
    path: 'admin-create-employee',
    component: AdminCreateEmployeeComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },

  // otherwise redirect to LandingPage
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
