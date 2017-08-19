import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Http, Response } from '@angular/http';
import 'rxjs/add/Observable/of';
import { RestangularModule, Restangular } from 'ngx-restangular';

//import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/Observable/of';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular, private ProcessHTTPMsgService: ProcessHTTPMsgService) { }

 getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
     //return Observable.of(PROMOTIONS).delay(2000);
 }

 getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one('promotions', id);
    //return Observable.of(PROMOTIONS.filter((promo) => (promo.id == id))[0]).delay(2000);
}

getFeaturedPromotion(): Observable<Promotion> {
   return this.restangular.all('promotions').getList({featured: true}).map(promotion => promotion[0]);
   //return Observable.of(PROMOTIONS.filter((promo) => (promo.featured))[0]).delay(2000);
}

}
