import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public ticketVal:string;

  constructor(public navCtrl: NavController, public locationTracker: LocationTracker) {
 
  }
  start(){
    console.log(this.ticketVal);
    this.locationTracker.startTracking(this.ticketVal);
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }
 
}
