import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/filter';
 
@Injectable()
export class LocationTracker {
 
  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
 
  constructor(public zone: NgZone, public backgroundGeolocation: BackgroundGeolocation, public geolocation: Geolocation, public http: HTTP) {
  }
 
  startTracking(ticket) {
    // Background Tracking
 
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 5,
      distanceFilter: 300,
      debug: true,
      notificationTitle: "Jet airways",
      notificationText: "We know where you are"
    };
 
    this.backgroundGeolocation.configure(config).subscribe((location) => {
 
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

 
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });
      

      var link = 'https://www.jet-airways-stl.com/gt5ws.nsf/ws_shipmentLocationUpdate?openagent&dispatchTicketNumber='+ ticket +'&latitude='+ this.lat +'&longitude=' + this.lng;
      this.http.get(link, {}, {});
 
    }, (err) => {
 
      console.log(err);
 
    });
 
    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();
 
 
    // Foreground Tracking
 
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };
 
    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
    console.log(position);
 
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
      var link = 'https://www.jet-airways-stl.com/gt5ws.nsf/ws_shipmentLocationUpdate?openagent&dispatchTicketNumber='+ ticket +'&latitude='+ this.lat +'&longitude=' + this.lng;
      this.http.get(link, {}, {}); 
    });
   }
 
  stopTracking() {
    console.log('stopTracking');
 
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }
}
