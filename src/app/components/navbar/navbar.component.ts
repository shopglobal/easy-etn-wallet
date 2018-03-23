import { Component, OnInit } from '@angular/core';
import { NgbModule, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig] // add NgbDropdownConfig to the component providers
})
export class NavbarComponent implements OnInit {

  constructor(config: NgbDropdownConfig) { 
      // customize default values of dropdowns used by this component tree
      config.placement = 'bottom-right';
      config.autoClose = true;
  }

  ngOnInit() {
  }

}