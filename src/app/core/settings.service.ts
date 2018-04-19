import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Warehouse } from 'ngx-warehouse';

export interface Settings {
  app_sounds: boolean;
  app_interval: number;
  wallet_name: string;
  wallet_password: string;
  wallet_lang: string;
}

const storageKey = 'settings';

@Injectable()
export class SettingsService {

  public _settings: Settings;
  
  constructor(private warehouse: Warehouse) {
    
  }
    
}