import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { makeUrl, Daemon } from './monerod/monerod';

@Injectable()
export class DaemonService {

  // Daemon Connect
  url = makeUrl('http', '127.0.0.1', '48091', 'getheight');
  mydaemon = Daemon(this.url);

  getDaemonHeight() {
    return this.mydaemon.getheight();
  }

}
