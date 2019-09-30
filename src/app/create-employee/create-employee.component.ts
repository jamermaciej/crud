import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Department } from '../models/department.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { PasswordValidator } from './../validators/password.validator';
import { EmployeeService } from '../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateEmployeeCanDeactivateGuardService } from '../guards/create-employee-can-deactivate.guard.service';
import { Employee } from '../models/epmloyee.model';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  showPhoto = false;
  photoPath: string;
  headerTitle: string;
  departments: Department[] = [
    {
      id: 1,
      name: 'Help Desk'
    },
    {
      id: 2,
      name: 'HR'
    },
    {
      id: 3,
      name: 'IT'
    },
    {
      id: 4,
      name: 'Payroll'
    }
  ];

  validatorsMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be greater than 2 characters.',
      'maxlength': 'Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.'
    },
    'phone': {
      'required': 'Phone is required.'
    },
    'contactPreference': {
      'required': 'Contact preference is required.'
    },
    'gender': {
      'required': 'Gender is required.'
    },
    'department': {
      'required': 'Department is required.'
    },
    'dateOfBirth': {
      'required': 'Date of birth is required.'
    },
    'photoPath': {
      'required': 'Photo path is required.'
    },
    'password': {
      'required': 'Password is required.'
    },
    'confirmPassword': {
      'required': 'Confirm password is required.'
    }
  };

  formErrors = {
    'name': '',
    'email': '',
    'phone': '',
    'contactPreference': '',
    'gender': '',
    'department': '',
    'dateOfBirth': '',
    'photoPath': '',
    'password': '',
    'confirmPassword': ''
  };

  employeeForm: FormGroup;
  discardModalFlag = true;
  modalRef: BsModalRef;
  @ViewChild('discardModal', { static: false })
  discardModal;

  constructor(private formBuilder: FormBuilder,
              private employeeSerive: EmployeeService,
              private router: Router,
              private modalService: BsModalService,
              private createEmployeeCanDeactivateGuard: CreateEmployeeCanDeactivateGuardService,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      id: null,
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      contactPreference: ['Email', Validators.required],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      photoPath: ['', Validators.required],
      password: ['', Validators.required],
      isActive: '',
      confirmPassword: ['', Validators.required],
    }, { validator: PasswordValidator.validatePassword });

    this.route.paramMap.subscribe(param => {
      const id = +param.get('id');
      this.getEmployee(id);
    });

    this.employeeForm.valueChanges.subscribe(data => {
      this.logValidationErrors(this.employeeForm);
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe(data => {
      this.onContactPreferenceChange(data);
    });
  }

  getEmployee(id: number) {
    if (id !== 0) {
      this.headerTitle = 'Edit Employee';
      let employee: Employee;
      this.employeeSerive.getEmployee(id).subscribe(empl => {
        employee = empl;
        this.employeeForm.setValue({
          id: employee.id,
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          contactPreference: employee.contactPreference,
          gender: employee.gender,
          department: employee.department,
          dateOfBirth: employee.dateOfBirth,
          photoPath: employee.photoPath,
          password: '',
          isActive: employee.isActive,
          confirmPassword: ''
        });
      });
    } else {
      // this.employeeForm.reset();
      this.headerTitle = 'Create Employee';
    }
  }

  get department() {
    return this.employeeForm.get('department');
  }

  togglePhotoPeview() {
    this.showPhoto = !this.showPhoto;
  }

  discardChanges() {
    this.createEmployeeCanDeactivateGuard.discard();
    this.modalRef.hide();
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      // sprawdzenie czy nie ma zagniezdzonych fromGroup
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        // console.log(`Key = ${key} Value = ${abstractControl.value}`);
        if ( abstractControl && abstractControl.invalid && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validatorsMessages[key];
          // for (const error in abstractControl.errors)
          for (const errorKey of Object.keys(abstractControl.errors)) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey];
            }
          }
        }
      }
    });
  }

  onContactPreferenceChange(selectedValue: string) {
    const phoneFormControl = this.employeeForm.get('phone');
    if ( selectedValue === 'Phone') {
      phoneFormControl.setValidators(Validators.required);
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
  }

  onSubmit() {
    this.logValidationErrors(this.employeeForm);
    this.discardModalFlag = false;
    if (this.employeeForm.get('id').value === null) {
      this.employeeSerive.addEmployee(this.employeeForm.value).subscribe(data => {
        // this.employeeForm.reset();
        // this.router.navigate(['list']);
      });
    } else {
      this.employeeSerive.updateEmployee(this.employeeForm.value).subscribe(() => {
        // this.employeeForm.reset();
        this.router.navigate(['list']);
      });
    }
  }

  openModal(discardModal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(discardModal);
  }
}
