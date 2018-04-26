import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { makeUrl, Daemon } from './monerod/monerod';

@Injectable()
export class DaemonService {

  // Daemon Connect
  url = makeUrl('http', '66.175.216.72', '26968', 'getheight');
  mydaemon = Daemon(this.url);

  getDaemonHeight() {
    return this.mydaemon.getheight();
  }

}