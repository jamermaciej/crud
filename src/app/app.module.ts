import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmployeesListResolveService } from './resolvers/employees-list-resolve.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PasswordValidator } from './validators/password.validator';
import { EmployeeService } from './services/employee.service';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateEmployeeCanDeactivateGuardService } from './guards/create-employee-can-deactivate.guard.service';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { FilterComponent } from './filter/filter.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { EmployeeDetailsCanActivateGuardService } from './guards/employee-details-can-activate.guard.service';
import { AccordionComponent } from './shared/accordion/accordion.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    NotFoundComponent,
    CreateEmployeeComponent,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    FilterComponent,
    SpinnerComponent,
    AccordionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    EmployeeService,
    CreateEmployeeCanDeactivateGuardService,
    EmployeesListResolveService,
    EmployeeDetailsCanActivateGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
