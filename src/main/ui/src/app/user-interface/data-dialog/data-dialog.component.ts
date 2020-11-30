import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MainMenuComponent} from "../main-menu/main-menu.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-material-dialog',
  templateUrl: './data-dialog.component.html',
  styleUrls: ['./data-dialog.component.css']
})
export class DataDialogComponent implements OnInit {
  description = "..."
  hours: number [] = [1,2,5,12,24];
  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<MainMenuComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.description = data.description;
    this.form = formBuilder.group({
      time: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  confirm() {
    this.dialogRef.close(this.form.controls['time'].value);
  }

  close() {
    this.dialogRef.close(null);
  }

  get f(){
    return this.form.controls;
  }
}
