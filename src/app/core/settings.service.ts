import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface Application {
  display: string;
  sounds: boolean;
  interval: number;
}

const applicationKey = 'application';

@Injectable()
export class SettingsService {

  public _applicationSettings: Application;
  
  constructor() {
    this._applicationSettings = JSON.parse(localStorage.getItem(applicationKey));
  }

   /**
   * Gets the app settings.
   * @return {Application} app settings null
   */
  get application(): Application {
    return this._applicationSettings;
  }

    /**
   * Sets the application settings.
   * @param {Application=} application The app settings.
   */
  setSettings(application?: Application) : Observable<Application> {
    this._applicationSettings = application;
    if (application) {
      localStorage.setItem(applicationKey, JSON.stringify(application));
    } else {
      localStorage.removeItem(applicationKey);
    }
    return Observable.of(application);
  }
    
}