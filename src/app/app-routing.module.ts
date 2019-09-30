import { EmployeesListResolveService } from './resolvers/employees-list-resolve.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { CreateEmployeeCanDeactivateGuardService } from './guards/create-employee-can-deactivate.guard.service';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeDetailsCanActivateGuardService } from './guards/employee-details-can-activate.guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListEmployeesComponent,
    resolve: { employeesList: EmployeesListResolveService }
  },
  {
    path: 'edit/:id',
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGuardService]
  },
  {
    path: 'employee/:id',
    component: EmployeeDetailsComponent,
    canActivate: [EmployeeDetailsCanActivateGuardService]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }