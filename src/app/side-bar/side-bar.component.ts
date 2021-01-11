import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { EventHistory } from './event-history.payload';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Input()  mymap: any;
  eventHistory: Array<EventHistory>
  constructor(private eventService: EventService) {
    
  }

  ngOnInit(): void {
    const _this = this;
    this.eventService.getAllHistory().subscribe(eventHistory => {
      _this.eventHistory = eventHistory
      console.log(eventHistory);
    });
    console.log(this.eventHistory);
  }
 
  focus(lng: number,lat :number){
    console.log(lng, lat)
    this.mymap.setView([lat, lng], 100);
  }
}
