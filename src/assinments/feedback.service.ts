import { Injectable } from '@angular/core';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Http, Response } from '@angular/http';
import 'rxjs/add/Observable/of';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Feedback } from '../shared/Feedback';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular, private ProcessHTTPMsgService: ProcessHTTPMsgService) { }


  submitFeedback(feedback: Feedback): Observable<Response>{
     return this.restangular.all('feedback').post('feedback');
 }
}
