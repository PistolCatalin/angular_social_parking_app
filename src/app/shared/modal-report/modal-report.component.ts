import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { EventService } from '../event.service';
import { SharedService } from '../shared.service';
import { AddEvent } from './add-event.payload';

@Component({
  selector: 'app-modal-report',
  templateUrl: './modal-report.component.html',
  styleUrls: ['./modal-report.component.css']
})

export class ModalReportComponent implements OnInit {

  addEvent: FormGroup;

  public breakpoint: number; // Breakpoint observer code
  public longitutde: string = '';
  public latitude: string = '';

  price: number;
  public addCusForm: FormGroup;
  selected = 'None';
  eventBody: AddEvent;
  constructor(private fb: FormBuilder,public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: {lat: string, long: string},
  private eventService: EventService) {

    this.latitude = this.data.lat;
    this.longitutde =this.data.long;
    this.eventBody = {
      latitude:'',
      longitutde:'',
      price :0,
      type:'',
      description:''
    }
  
  }

  public ngOnInit(): void {
  
    this.addEvent = this.fb.group({
      latitude: [this.latitude, [Validators.required,  Validators.required]],
      longitutde: [this.longitutde, [Validators.required,  Validators.required]],
      description: ['', [Validators.required, Validators.required]],
      price: ['', [Validators.required, Validators.required]],
      type: ['', [Validators.required, Validators.required]],
    });
    this.breakpoint =  1; // Breakpoint observer code
  }

  public onAddCus(): void {
    this.markAsDirty(this.addCusForm);
  }

  openDialog(): void {
    this.dialog.closeAll();
  }

  // tslint:disable-next-line:no-any
  public onResize(event: any): void {
    this.breakpoint =  1;
  }

  submitEvent(){
    this.eventBody.description = this.addEvent.get("description").value;
    this.eventBody.price = this.addEvent.get("price").value;
    this.eventBody.latitude = this.addEvent.get("latitude").value;
    this.eventBody.longitutde = this.addEvent.get("longitutde").value;
    this.eventBody.type = this.addEvent.get("type").value;
    console.log(this.eventBody);
    this.eventService.addEvent(this.eventBody).subscribe((data) => {
      console.log(data);
    }, error => {
      throwError(error);
    });
    this.dialog.closeAll();
    window.location.reload();
  }
  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }



}
