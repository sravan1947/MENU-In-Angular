import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../service/dish.service';
import {Promotion} from '../shared/promotion';
import { PromotionService } from '../service/promotion.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish:Dish;
  promotion: Promotion;
  constructor(private dishservice : DishService,
     private promotionservice: PromotionService) { }

  ngOnInit() {
    this.dish=this.dishservice.getFeatureDish();
    this.promotion=this.promotionservice.getFeaturedPromotion();
  }

}
