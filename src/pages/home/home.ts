import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
import { PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover'
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public ticketVal:string;
  splash = true;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public locationTracker: LocationTracker) {}

  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 4200);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

  start(){
    console.log(this.ticketVal);
    this.locationTracker.startTracking(this.ticketVal);
  }
  stop(){
    this.locationTracker.stopTracking(this.ticketVal);
  }
}
