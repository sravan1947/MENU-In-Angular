import { Component, OnInit ,Inject} from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../service/dish.service';
import {Promotion} from '../shared/promotion';
import { PromotionService } from '../service/promotion.service'
import { LeaderService } from '../service/leader.service';
import {leader} from  '../shared/leader';
import { flyInOut,expand } from '../animations/app.animation';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  dish:Dish;
  promotion: Promotion;
  leaders : leader;
  errmsg: string;
  constructor(private dishservice : DishService,
     private promotionservice: PromotionService,
     private leaderservice: LeaderService ,@Inject('BaseURL') private BaseURL ) { }

  ngOnInit() {
    this.dishservice.getFeatureDish().subscribe(dish=>this.dish=dish,err=>this.errmsg=<any> err);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion=>this.promotion=promotion,err=>this.errmsg=<any> err);
    this.leaderservice.getFeaturedPromotion().subscribe(leaders=>this.leaders=leaders);
  }

}
