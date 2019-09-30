import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input() hasJustViewed: boolean;
  @Input() title: string;
  isHidden = false;

  constructor() { }

  ngOnInit() {
  }

}
