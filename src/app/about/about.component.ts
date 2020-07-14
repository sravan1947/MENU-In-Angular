import { Component, OnInit } from '@angular/core';
import {leader} from '../shared/leader'
import  { LeaderService } from '../service/leader.service';
import { flyInOut,expand } from '../animations/app.animation';
import {baseURL} from '../shared/baseurl'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {
  leaders : leader[];
  BaseUrl= baseURL;
  constructor(private leaderService: LeaderService ) {

   }

  ngOnInit() {
    this.leaderService.getLeaders().subscribe(leaders=>this.leaders=leaders);
  }

}
