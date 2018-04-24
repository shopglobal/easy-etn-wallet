
import { Injectable } from '@angular/core';
import { MoneroDaemon } from "./monerod.service";

@Injectable()
export class DaemonService {

  private monerod = new MoneroDaemon("66.175.216.72", 26968);

  getDaemonHeight() {
    this.monerod.getHeight();
    console.log(this.monerod.getHeight());
  }

}