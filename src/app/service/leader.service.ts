import { Injectable } from '@angular/core';
import {leader} from '../shared/leader'
import { LEADERS } from '../shared/leaders'
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders() : leader[] {
    return LEADERS;
  }
  getLeader(id :string ): leader{
    return LEADERS.filter((leaders) => (leaders.id==id))[0];
  }
  getFeaturedPromotion(): leader{
    return LEADERS.filter((leader) => leader.featured)[0];
    }
 
}
