import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/catch';

@Injectable()
export class FeedbackService {

 
constructor(private restangular: Restangular,
              private processHTTPMsgService: ProcessHTTPMsgService) { }   
   
 submitFeedback(feedback: Feedback): Observable<Feedback>{
   
   // return this.restangular.all("feedback").getList().post(feedback);
     
     return this.restangular.all('feedback').post(feedback);
     
   /*   return this.restangular.all('feedback').post(feedback,'',{'Content-Type': 'application/json'}).then(function(response) {
        console.log("Object saved OK");
    }, function(response) {
      console.log("There was an error saving");
      console.log(response);
    });
*/
     
    //var feedBacks = Restangular.all('feedback'); 
    ///    feedBacks.post(feedback);
     



 }

}
