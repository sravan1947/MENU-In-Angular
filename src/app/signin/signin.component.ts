import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user ={username: '',password: '',remember: false};
  constructor(public dialogRef: MatDialogRef<SigninComponent>) { }

  ngOnInit() {
  }
  onSubmit()
  {
    console.log('User:',this.user);
    this.dialogRef.close();
  }
}
