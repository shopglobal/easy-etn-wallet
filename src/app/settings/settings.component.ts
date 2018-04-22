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
          className: "col-12",
          key: "interval",
          type: "select",
          templateOptions: {
            label: "Wallet refresh speed?",
            options: [
              { label: "As fast as possible", value: "20000" },
              { label: "Not too fast, not to slow", value: "60000" },
              { label: "Slightly faster then a turtle", value: "120000" },
            ],
            required: true,
          },
        },
        {
          className: "col-12",
          key: "sounds",
          type: "select",
          templateOptions: {
            label: "Do you like sounds?",
            options: [
              { label: "Hate them!", value: "true" },
              { label: "Love them!", value: "false" },
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
