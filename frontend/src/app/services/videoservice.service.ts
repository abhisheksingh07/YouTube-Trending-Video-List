import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VideoserviceService {
  data:Array<any>=[]
  constructor(private http: HttpClient, private route: Router,) { }
  
  getVideoList():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/videos`).pipe(
      map((res: Response) => {
        return res || {}
      })
    )
  }


  getVideoDeatil(id:String):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/videodetail/${id}`).pipe(
      map((res: Response) => {
        return res || {}
      })
    )
   }
  
   routetodetailPage(id:String){
    this.route.navigate([`/videodetail/${id}`])
  }

  saveVideoDeatils(id:String):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/updateVideoInfo/${id}`,id).pipe(map((res:Response)=>{
         return res || {}
    }))
  }

}
