import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEvent } from '../modal-report/add-event.payload';
import { EditParkingSpotComponent } from './edit-parking-spot/edit-parking-spot.component';

@Component({
  selector: 'app-view-parking-spot',
  templateUrl: './view-parking-spot.component.html',
  styleUrls: ['./view-parking-spot.component.css']
})
export class ViewParkingSpotComponent implements OnInit {
  
  breakpoint: number;
  public updateForm: FormGroup;
  addEvent: AddEvent;
  show: String;

  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data:any) {
    this.addEvent = data;
    this.show = data.status.replace(/ /g,'');

  }

  ngOnInit(): void {
    this.breakpoint =  1; // Breakpoint observer code
  }
  openDialog(): void {
  
      const dialogRef = this.dialog.open(EditParkingSpotComponent, {
        width: '500px',
        data: this.addEvent.id
      });
  }
  closeDialog(): void{
    this.dialog.closeAll();
  }

}
