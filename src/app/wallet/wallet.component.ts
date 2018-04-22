// Angular Core
import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

// Services
import { SettingsService } from "../core/settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
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
export class WalletComponent implements OnInit {

  name: string;

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.name = this.settingsService.application.display;
  }

}
