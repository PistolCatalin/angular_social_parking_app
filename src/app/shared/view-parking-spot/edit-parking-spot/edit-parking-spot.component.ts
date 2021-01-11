import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-edit-parking-spot',
  templateUrl: './edit-parking-spot.component.html',
  styleUrls: ['./edit-parking-spot.component.css']
})
export class EditParkingSpotComponent implements OnInit {
  selected : Number;
  reserveForm: FormGroup;
  id: Number;
  constructor(private fb: FormBuilder,
  private dialog: MatDialog,
  private dialogRef: MatDialogRef<EditParkingSpotComponent>,
  private eventService: EventService,
  @Inject(MAT_DIALOG_DATA) public data:any,
  private toastr: ToastrService) {
    this.id = this.data
  } // Closing dialog window
  ngOnInit(): void {
    this.reserveForm = new FormGroup({
      type: new FormControl()
   });
  }

  public cancel(): void { // To cancel the dialog window
  this.dialogRef.close();
  }

  public cancelN(): void { 
  this.dialog.closeAll();
  }
  reserve(){
    this.eventService.reserveParkingSpot(this.id,this.selected).subscribe((data) => {
      console.log(data);

    }, error => {
      throwError(error);
    });
    this.toastr.success('The Parking Place was succefully reserved');
    setTimeout(function(){ window.location.reload() }, 3000);
    this.dialog.closeAll();
  }
}
