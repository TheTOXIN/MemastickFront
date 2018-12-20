import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  public steps = [{
    number: 1,
    name: 'TEST',
    description: 'блаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблабла',
    color: '#55984e',
    idHeading: 'headingStep1',
    idCollapse: 'collapseStep1',
  }, {
    number: 2,
    name: 'TEST',
    description: 'блаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблабла',
    color: '#bfbd0b',
    idHeading: 'headingStep2',
    idCollapse: 'collapseStep2',
  }, {
    number: 3,
    name: 'TEST',
    description: 'блаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблабла',
    color: '#660e7b',
    idHeading: 'headingStep3',
    idCollapse: 'collapseStep3',
  }, {
    number: 4,
    name: 'TEST',
    description: 'блаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблабла',
    color: '#435d98',
    idHeading: 'headingStep4',
    idCollapse: 'collapseStep4',
  }, {
    number: 5,
    name: 'TEST',
    description: 'блаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблабла',
    color: '#982f4d',
    idHeading: 'headingStep5',
    idCollapse: 'collapseStep5',
  }, {
    number: 6,
    name: 'TEST',
    description: 'блаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблабла',
    color: '#000000',
    idHeading: 'headingStep6',
    idCollapse: 'collapseStep6',
  }, {
    number: 7,
    name: 'TEST',
    description: 'блаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблаблабла',
    color: '#4c4757',
    idHeading: 'headingStep7',
    idCollapse: 'collapseStep7',
  }];

  constructor() {
  }

  ngOnInit() {
  }

}
