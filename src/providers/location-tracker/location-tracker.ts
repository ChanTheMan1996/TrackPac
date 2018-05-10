import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/filter';
 
@Injectable()
export class LocationTracker {
 
  public watch: any;   
  public lat: any;
  public lng: any;
 
  constructor(public zone: NgZone, public backgroundGeolocation: BackgroundGeolocation, public geolocation: Geolocation, public http: HTTP) {
  }
 
  startTracking(ticket) {
    // Background Tracking
 
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 50,
      distanceFilter: 8047,
      debug: true,
      notificationTitle: "Jet airways",
      notificationText: "We know where you are",
      notificationIconColor: "#1368f2"
    };
 
    this.backgroundGeolocation.configure(config).subscribe((location) => {
 
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

 
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
        var link = 'https://www.jet-airways-stl.com/gt5ws.nsf/ws_shipmentLocationUpdate?openagent&dispatchTicketNumber='+ ticket +'&latitude='+ this.lat +'&longitude=' + this.lng;
        this.http.get(link, {}, {});
      });
 
    }, (err) => {
 
      console.log(err);
 
    });
 
    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();
   }
 
  stopTracking(ticket) {
    console.log('stopTracking');

    var link = 'https://www.jet-airways-stl.com/gt5ws.nsf/ws_shipmentLocationUpdate?openagent&dispatchTicketNumber='+ ticket +'&latitude='+ this.lat +'&longitude=' + this.lng;
    this.http.get(link, {}, {}); 

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }
}
