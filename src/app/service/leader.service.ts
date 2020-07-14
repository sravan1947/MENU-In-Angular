import { Injectable } from '@angular/core';
import {leader} from '../shared/leader'
import { LEADERS } from '../shared/leaders'
import {of, Observable} from 'rxjs';
import {delay, catchError,map} from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
import { observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:  HttpClient, private processHTTPMsgService : ProcessHTTPMsgService) { }
  getLeaders() : Observable<leader[]> {
    return this.http.get<leader[]>(baseURL+"leadership").pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getLeader(id :string ): Observable<leader>{
    return this.http.get<leader>(baseURL+"leadership"+id).pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getFeaturedPromotion(): Observable<leader>{
    return this.http.get<leader>(baseURL+'leadership?featured=true').pipe(map(leadership =>leadership[0])).pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
