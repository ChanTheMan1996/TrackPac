import { Component } from '@angular/core';

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  text: string;
  about: string;
  item1: string;
  item2: string;
  item3: string;
  item4: string;
  item5: string;
  link: string;


  constructor() {
    this.text = 'Info';
    this.item1 = "Enter your ticket number";
    this.item2 = "Hit start tracking";
    this.item3 = "Allow all loaction permissions";
    this.item4 = "Just leave the app running";
    this.item5 = "App works in background";

    this.link = "Tech Support";
  }

}
