import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsCanActivateGuardService implements CanActivate {
  constructor(private employeeSerive: EmployeeService,
              private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // const employeeExist = !!this.employeeSerive.getEmployee(+route.paramMap.get('id'));
    // if (employeeExist) {
    //     return true;
    // } else {
    //     this.router.navigate(['404']);
    //     return false;
    // }
    return this.employeeSerive.getEmployee(+route.paramMap.get('id')).pipe(
      map(employee => {
        const employeeExist = !!employee;
        if (employeeExist) {
          return true;
        } else {
          this.router.navigate(['404']);
          return false;
        }
      })
    );
  }

}
