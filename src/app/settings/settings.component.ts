// Angular Core
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { trigger, style, animate, transition } from "@angular/animations";
import { Router } from '@angular/router';
// Servvices
import { SettingsService } from "../core/settings.service";
// 3rd Party
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
  animations: [
    trigger(
      "enterAnimation", [
        transition(":enter", [
          style({opacity:0}),
          animate(500, style({opacity:1}))
        ])
      ]
    )
  ]
})
export class SettingsComponent implements OnInit {

  constructor(
    private settingsService: SettingsService,
    private router: Router
  ) { }

  // Form Config
  isLoading = false; // States
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: "row",
      fieldGroup: [
        {
          className: "col-12",
          key: "display",
          type: "input",
          templateOptions: {
            type: "text",
            label: "What's your name?",
            placeholder: "John",
            required: true,
          },
        },
        {
          className: "col-6",
          key: "interval",
          type: "select",
          templateOptions: {
            label: "Refresh speed?",
            options: [
              { label: "Fast (20 seconds)", value: "20000" },
              { label: "Normal (60 seconds)", value: "60000" },
              { label: "Slow (120 seconds)", value: "120000" },
            ],
            required: true,
          },
        },
        {
          className: "col-6",
          key: "sounds",
          type: "select",
          templateOptions: {
            label: "Enable sounds?",
            options: [
              { label: "Sure", value: "true" },
              { label: "No Thanks", value: "false" },
            ],
            required: true,
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
      this.router.navigate(['/wallet'], { replaceUrl: true });
    }, error => {
      console.log(error);
    });
  }

  getSettings() {
    if (this.settingsService.application) {
      this.model = this.settingsService.application;
      console.log("Get app settings triggered");
    }
  }

  ngOnInit() {
    this.getSettings();
  }

}
