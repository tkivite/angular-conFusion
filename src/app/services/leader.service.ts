import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';

import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/catch';


@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular,
              private processHTTPMsgService: ProcessHTTPMsgService) { }
getLeaders(): Observable<Leader[]> {
    
    return this.restangular.all('leaders').getList();
    
    
}

    getFeaturedLeader(): Observable<Leader> {
        return this.restangular.all('leaders').getList({featured: true}).map(dishes => dishes[0]);;

}

}
