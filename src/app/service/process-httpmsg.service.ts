import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {
  constructor() { }
  public handleError(error: HttpErrorResponse|any)
  {
    let errMsg:string;
    if(error.error instanceof ErrorEvent)
    {
      errMsg=error.error.message;
    }
    else
    {
      errMsg=`${error.status} -${error.statusText ||''} ${error.error}`; 
    }
    return throwError(errMsg);
  }
}
