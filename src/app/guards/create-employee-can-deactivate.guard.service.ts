import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateEmployeeCanDeactivateGuardService implements CanDeactivate<CreateEmployeeComponent> {
  constructor() {}

  private discardSubject: Subject<boolean> = new Subject<boolean>();

  discard(): void {
    this.discardSubject.next(true);
  }

  keep(): void {
    this.discardSubject.next(false);
  }

  canDeactivate(component: CreateEmployeeComponent): any {
    if (component.employeeForm.dirty && component.discardModalFlag) {
      component.openModal(component.discardModal);
      return this.discardSubject.asObservable().pipe(first());
    }

    return true;
  }
}
