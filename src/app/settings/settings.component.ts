// Angular Core
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
// Servvices
import { SettingsService } from '../core/settings.service';
// 3rd Party
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity:0}),
          animate(500, style({opacity:1}))
        ])
      ]
    )
  ]
})
export class SettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  // Form Config
  isLoading = false; // States
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          key: 'display',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'First Name',
            placeholder: 'John',
            required: true,
          },
        },
        {
          className: 'col-12',
          key: 'interval',
          type: 'select',
          templateOptions: {
            label: 'Refresh Interval',
            options: [
              { label: '30 Seconds', value: '30000' },
            ],
          },
        },
        {
          className: 'col-12',
          key: 'sounds',
          type: 'checkbox',
          templateOptions: {
            label: 'Enable Sounds?',
          },
        },
      ],
    },
  ];

  submit(model) {
    this.isLoading = true;
    this.settingsService.setSettings(model)
    .finally(() => {
      this.isLoading = false;
    })
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  getSettings() {
    if (this.settingsService.application) {
      this.model = this.settingsService.application;
      console.log('Get app settings triggered');
    }
  }

  ngOnInit() {
    this.getSettings();
  }

}
