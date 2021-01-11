import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventHistory } from '../side-bar/event-history.payload';
import { AddEvent } from './modal-report/add-event.payload';
import { PieData } from './pie-data.payload';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) { }

  addEvent(eventPayload: AddEvent): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/event/add/', eventPayload);
  }

  getAllEvent(): Observable<Array<AddEvent>> {
    return this.httpClient.get<Array<AddEvent>>('http://localhost:8080/api/event/');
  }
  getAllHistory(): Observable<Array<EventHistory>> {
    return this.httpClient.get<Array<EventHistory>>('http://localhost:8080/api/event/getHistory');
  }
  getAllDataPie(): Observable<Array<PieData>> {
    return this.httpClient.get<Array<PieData>>('http://localhost:8080/api/event/getPieChartEvents');
  }

  reserveParkingSpot(id: Number, minutes : Number) : Observable<any> {
        // Initialize Params Object
        let params = new HttpParams();

        // Begin assigning parameters
        params = params.append('id', id.toString());
        params = params.append('minutes', minutes.toString());
    return this.httpClient.get<Array<EventHistory>>('http://localhost:8080/api/event/reserve/'+id.toString()+"/"+minutes.toString());
  }
}
