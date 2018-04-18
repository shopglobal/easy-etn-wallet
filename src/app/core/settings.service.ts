import { Injectable } from '@angular/core';
import { Warehouse } from 'ngx-warehouse';

@Injectable()
export class SettingsService {

  name;
  username;
  password;
  interval;
  
  constructor(public warehouse: Warehouse) { 
    this.warehouse.get('settings').subscribe(
      (response) => { 
        this.username = response.username;
        console.log(this.username);
      }
    )
  }

}