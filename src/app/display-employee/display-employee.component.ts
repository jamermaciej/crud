import { EmployeeService } from './../services/employee.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/epmloyee.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.scss']
})
export class DisplayEmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Input() filterText: string;
  @Output() nofifyDelete: EventEmitter<number> = new EventEmitter<number>();
  id: number;
  confirmDelete = false;
  isHidden = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService
    ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  viewEmployee() {
    this.router.navigate(['/employee', this.employee.id], {
      queryParams: {
        filterText: this.filterText
      }
    });
  }

  editEmployee() {
    this.router.navigate(['/edit', this.employee.id]);
  }

  deleteEmployee() {
    // this.employeeService.deleteEmployee(this.employee.id).subscribe(() => {
    //     console.log('Employee deleted');
    // });
    this.nofifyDelete.emit(this.employee.id);
  }
}
