import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalReportComponent } from '../shared/modal-report/modal-report.component'
import { ViewParkingSpotComponent } from '../shared/view-parking-spot/view-parking-spot.component'
import { SharedService } from '../shared/shared.service';
import { Location } from './location.payload';
import { EventService } from '../shared/event.service';
import { AddEvent } from '../shared/modal-report/add-event.payload';
import { throwError } from 'rxjs';
declare const L:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public mymap: { on: (arg0: string, arg1: (e: { latlng: Location; }) => void) => void; };
  icon_illegal = L.icon({
    iconUrl: 'assets/images/icon_illegal.webp',
    iconSize: [35, 35],
    shadowSize:   [50, 64],
    popupAnchor: [-3, -76],
    shadowAnchor: [22, 94]
  });
  icon_abandoned = L.icon({
    iconUrl: 'assets/images/icon_abandoned.png',
    iconSize: [35, 35],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
  });
  icon_parking_spot = L.icon({
    iconUrl: 'assets/images/icon_parking_spot.png',
    iconSize: [30, 40],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
  });
  icon_parking_spot_reserved = L.icon({
    iconUrl: 'assets/images/icon_parking_spot_reserved.png',
    iconSize: [30, 40],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
  });
  
  public arrayEvents: Array<AddEvent>;

  constructor(public dialog: MatDialog, private eventService: EventService) { 


    
  }

  ngOnInit(): void {
    
    this.mymap = L.map('mapid').setView([44.439663, 26.096306], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2F0YWxpbjE1MSIsImEiOiJja2o5Nm9rOTc2eWh3MnNsYndyZGsya3FmIn0.GVIe1LI8kJ-oUHPpILUoNQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
    }).addTo(this.mymap);
    this.eventService.getAllEvent().subscribe(event => {
      
          
      this.arrayEvents = event;
      console.log(this.arrayEvents);
      for(let i = 0; i< event.length;++i){


        let icon;
        if(this.arrayEvents[i].type == "Abandoned vehicle") icon = this.icon_abandoned;
        else if (this.arrayEvents[i].type == "Parking Place") {
          icon = this.arrayEvents[i].status.replace(/ /g,'') === "Free"  ? this.icon_parking_spot: this.icon_parking_spot_reserved
        }
        else icon = this.icon_illegal

        var marker = L.marker([this.arrayEvents[i].latitude,this.arrayEvents[i].longitutde],
          {icon: icon },{customData:"Ceva"}).addTo(this.mymap).on('click', viewPointDetails);
          marker.customId = i
        //marker.properies.name = i;
      }
    }, error => {
      throwError(error);
    });



    const addEvent = (e: { latlng: Location; }) => {

      this.dialog.open(ModalReportComponent,{
        width: '640px',disableClose: true,
        data: {
          lat: e.latlng.lat,
          long: e.latlng.lng
        }
      });
    }

    const viewPointDetails =  (e :any) =>{
      this.dialog.open(ViewParkingSpotComponent,{
        width: '640px',disableClose: true,
        data: this.arrayEvents[e.target.customId]
      });
    }
    
    this.mymap.on('click', addEvent);
   

  }
 

}
