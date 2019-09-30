import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/epmloyee.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input()
  filterList: [];
  @Output()
  filteredEmitter = new EventEmitter<[]>();
  @Output()
  filterTextEmitter = new EventEmitter<string>();

  private _filterText: string;
  filtered: [];
  listToFilter: any;

  get filterText() {
    return this._filterText;
  }
  set filterText(value: string) {
    this._filterText = value;
    this.filtered = this.filter(this._filterText);
    this.filteredEmitter.emit(this.filtered);
    this.filterTextEmitter.emit(this.filterText);
  }

  filter(filterText: string) {
    return this.listToFilter.filter( employee =>
      employee.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1);
  }

  constructor() { }

  ngOnInit() {
    this.listToFilter = this.filterList;
    // this.filtered = this.employees;
    // this.filterText = '';
  }

}
