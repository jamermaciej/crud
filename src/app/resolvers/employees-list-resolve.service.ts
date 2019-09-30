import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/epmloyee.model';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeesListResolveService implements Resolve<Employee[]> {
    constructor(private employeeService: EmployeeService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]> {
        return this.employeeService.getEmployees();
    }
}

