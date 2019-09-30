import { Component, OnInit } from '@angular/core';
import { Employee } from './../models/epmloyee.model';
import { EmployeeService } from '../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  private _filterText: string;
  filteredEmployees: Employee[];

  get filterText() {
    return this._filterText;
  }
  set filterText(value: string) {
    this._filterText = value;
    this.filteredEmployees = this.filter(this._filterText);
  }

  filter(filterText: string) {
    return this.employees.filter( employee =>
      employee.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
  }

  constructor(private employeeSerive: EmployeeService,
              private router: Router,
              private route: ActivatedRoute,
              private employeeService: EmployeeService
  ) {
    this.employees = this.route.snapshot.data['employeesList'];
    this.route.queryParamMap.subscribe(queryParams => {
      if (queryParams.has('searchText')) {
        this.filterText = queryParams.get('searchText');
      } else {
        this.filteredEmployees = this.employees;
      }
    });
  }

  ngOnInit() {
  }

  getEmployees() {
    this.employeeSerive.getEmployees().subscribe(employees => {
      this.filteredEmployees = employees;
    });
  }

  onDeliteNotification(id: number) {
    // const i = this.filteredEmployees.findIndex(e => e.id === id);
    // if (i !== -1) {
    //   this.filteredEmployees.splice(i, 1);
    // }
    // this.employeeService.deleteEmployee(id).subscribe(() => {
    //   console.log('Employee deleted');
    // });
    this.employeeService.deleteEmployee(id).subscribe(() => {
      console.log('Employee deleted');
      // this.getEmployees();
      this.filteredEmployees = this.filteredEmployees.filter(employee => employee.id !== id);
    });


  }

  // filteredEmployees(employees: Employee[]) {
  //   this.employees = employees;
  // }

  // filterTextEvent(filterText: string) {
  //   this.filterText = filterText;
  // }
}
