import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Employee } from '../models/epmloyee.model';
import { delay } from 'rxjs/internal/operators/delay';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private listEmployees: Employee[] = [
    {
      id: 1,
      name: 'Mark',
      gender: 'Male',
      email: 'mark@gmail.com',
      phone: 511222222,
      contactPreference: 'Email',
      dateOfBirth: new Date('10/25/1990'),
      department: '1',
      isActive: true,
      photoPath: 'assets/images/mark.png'
    },
    {
      id: 2,
      name: 'Tom',
      gender: 'Male',
      email: 'mark@gmail.com',
      phone: 511222222,
      contactPreference: 'Email',
      dateOfBirth: new Date('10/25/1990'),
      department: '2',
      isActive: true,
      photoPath: 'assets/images/tom.png'
    },
    {
      id: 3,
      name: 'Anna',
      gender: 'Female',
      email: 'mark@gmail.com',
      phone: 511222222,
      contactPreference: 'Email',
      dateOfBirth: new Date('10/25/1990'),
      department: '3',
      isActive: true,
      photoPath: 'assets/images/anna.jpg'
    },
    {
      id: 4,
      name: 'Helen',
      gender: 'Female',
      email: 'mark@gmail.com',
      phone: 511222222,
      contactPreference: 'Email',
      dateOfBirth: new Date('10/25/1990'),
      department: '4',
      isActive: true,
      photoPath: 'assets/images/anna.jpg'
    },
    {
      id: 5,
      name: 'Max',
      gender: 'Male',
      email: 'mark@gmail.com',
      phone: 511222222,
      contactPreference: 'Email',
      dateOfBirth: new Date('10/25/1990'),
      department: '1',
      isActive: true,
      photoPath: 'assets/images/max.jpg'
    }
  ];
  constructor(private httpClient: HttpClient
            ) { }

  getEmployees(): Observable<Employee[]> {
    // return of(this.listEmployees).pipe(delay(2000));
    return this.httpClient.get<Employee[]>('http://localhost:3001/employees');
  }

  getEmployee(id: number): Observable<Employee> {
    // return this.listEmployees.find( employee => employee.id === id);
    return this.httpClient.get<Employee>(`http://localhost:3001/employees/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    // if (employee.id === null ) {
      // niepotrzebne w rest api, automatycznie są dodawane id
      // const maxId = this.listEmployees.reduce((e1, e2) => {
      //   return (e1.id) > (e2.id) ? e1 : e2;
      // }).id;
      // employee.id = maxId + 1;
      return this.httpClient.post<Employee>('http://localhost:3001/employees', employee, {
        headers: new HttpHeaders({
          'Contetn-Type': 'application/json'
        })
      });
      // this.listEmployees.push(employee);
    // } else {
    //   const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
    //   this.listEmployees[foundIndex] = employee;
    // }
  }

  updateEmployee(employee: Employee): Observable<void> {
      return this.httpClient.put<void>(`http://localhost:3001/employees/${employee.id}`, employee, {
        headers: new HttpHeaders({
          'Contetn-Type': 'application/json'
        })
      });
  }

  deleteEmployee(id: number ): Observable<void> {
    // const i = this.listEmployees.findIndex(e => e.id === id);
    // if (i !== -1) {
    //   this.listEmployees.splice(i, 1);
    // }
    return this.httpClient.delete<void>(`http://localhost:3001/employees/${id}`);
  }
}
