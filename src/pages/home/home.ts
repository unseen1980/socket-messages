import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SocketService]
})
export class HomePage {
  private ioConnection: any;
  private ad: string;

  constructor(public navCtrl: NavController, private socketService: SocketService) {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.ioConnection =
      this.socketService
        .get()
        .subscribe((reading: string) => {
          this.ad = reading;
          console.info('reading', reading);
        });
  }

}
