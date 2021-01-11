import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  @Output() fire = new EventEmitter();

  constructor() {
    console.log('shared service started');
  }

  change(lat: string) {
    console.log('change started'); 
    this.fire.emit(lat);
    
  }

  getEmittedValue() {
    return this.fire;
  }
}
