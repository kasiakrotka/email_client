import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MainMenuComponent} from "../main-menu/main-menu.component";

@Component({
  selector: 'app-material-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  description = "Czy na pewno chcesz usunąć konto?"

  constructor(private dialogRef: MatDialogRef<MainMenuComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.description = data.description;
  }

  ngOnInit(): void {
  }

  confirm() {
    this.dialogRef.close(true)
  }

  close() {
    this.dialogRef.close(false);
  }
}
