import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Department } from '../models/department.model';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { PasswordValidator } from './../validators/password.validator';
import { EmailDomainValidator } from './../validators/email-domain.validator';
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
      'required': 'Email is required.',
      'email': 'Your email address is invalid.',
      'emailDomain': 'Email domain should be gmail.com.'
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
    'passwordGroup': {
      'passwordMismatch': 'Password and confirm password do not match.'
    },
    'password': {
      'required': 'Password is required.'
    },
    'confirmPassword': {
      'required': 'Confirm password is required.',
    },
    'skill': {
      'required': 'Skill name is required.',
    },
    'experience': {
      'required': 'Skill name is required.',
    },
    'description': {
      'required': 'Skill name is required.',
    }
  };

  formErrors = {

  };

  employeeForm: FormGroup;
  discardModalFlag = true;
  modalRef: BsModalRef;
  @ViewChild('discardModal', { static: false })
  discardModal;

  // skills: FormArray;


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
      email: ['', [Validators.required, Validators.email, EmailDomainValidator.validateEmailDomain('gmail.com')]],
      phone: [''],
      contactPreference: ['Email', Validators.required],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      photoPath: ['', Validators.required],
      isActive: '',
      passwordGroup: this.formBuilder.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, { validator: PasswordValidator.validatePassword }),
      skills: this.formBuilder.array([this.buildSkills()])
    });

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

  buildSkills(): FormGroup {
    return this.formBuilder.group({
      skill: ['', Validators.required],
      experience: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get skills(): FormArray {
    return <FormArray>this.employeeForm.get('skills');
    console.log('master');
  }

  addSkills(): void {
    this.skills.push(this.buildSkills());
  }

  removeSkills(i): void {
    this.skills.removeAt(i);
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
      this.formErrors[key] = '';
      // console.log(`Key = ${key} Value = ${abstractControl.value}`);

      if (abstractControl && abstractControl.invalid && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validatorsMessages[key];
        // for (const errorKey of Object.keys(abstractControl.errors)) {
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += `${messages[errorKey]} \n`;
          }
        }
      }

      // sprawdzenie czy nie ma zagniezdzonych fromGroup
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

      // sprawdzenie czy nie ma zagniezdzonych formArray
      // if (abstractControl instanceof FormArray) {
      //   for (const control of abstractControl.controls) {
      //     if (control instanceof FormGroup) {
      //       this.logValidationErrors(control);
      //     }
      //   }
      // }
    });
  }

  onContactPreferenceChange(selectedValue: string) {
    const phoneFormControl = this.employeeForm.get('phone');
    if (selectedValue === 'Phone') {
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
        this.router.navigate(['list']);
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
