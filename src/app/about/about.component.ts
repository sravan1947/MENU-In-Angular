import { Component, OnInit } from '@angular/core';
import {leader} from '../shared/leader'
import  { LeaderService } from '../service/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leaders : leader[];
  constructor(private leaderService: LeaderService ) {

   }

  ngOnInit() {
    this.leaders=this.leaderService.getLeaders();
  }

}
