import { Component, OnInit } from '@angular/core';
import { SigninComponent } from '../signin/signin.component';
import { MatDialog, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
openLoginForm()
 {
  this.dialog.open(SigninComponent,{width:"500px",height:"450px"});
  
 }
}
