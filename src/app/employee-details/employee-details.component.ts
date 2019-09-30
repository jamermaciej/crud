import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/epmloyee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee;
  private id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.id = +param.get('id');
      this.employeeService.getEmployee(this.id).subscribe(  employee => {
        this.employee = employee;
      });
    });
  }

  nextEmployee() {
    this.id < 5 ? this.id += 1 : this.id = 1;
    this.router.navigate(['/employee', this.id]);
  }
}
