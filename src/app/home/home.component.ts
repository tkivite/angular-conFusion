import { Component, OnInit,Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import {Promotion } from '../shared/promotion';
import {Leader } from '../shared/leader';

import { DishService } from '../services/dish.service';
import {PromotionService } from '../services/promotion.service';
import {LeaderService } from '../services/leader.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {      
dish: Dish;
promotion: Promotion;
leader: Leader;
dishErrMess: string; 
promoErrMess: string;
leaderErrMess: string;
    
constructor(
    private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') private BaseURL) { }
ngOnInit() {
    //this.dish = this.dishservice.getFeaturedDish();
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,errmess => this.dishErrMess = <any>errmess);
    //this.promotion = this.promotionservice.getFeaturedPromotion();
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion,errmess => this.promoErrMess = <any>errmess);
    //this.leader = this.leaderservice.getFeaturedLeader();
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader,errmess => this.leaderErrMess = <any>errmess);
        //console.log(this.leader);
}
   

}
