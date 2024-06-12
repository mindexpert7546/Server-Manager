import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CustomResponse } from '../interface/custom-response';
import { Server } from '../interface/server';
import { Status } from '../enum/status.enum';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private readonly apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  // url = "http://localhost:8080/server/list"
  // getServers(): Observable<CustomResponse>{
  //   return this.http.get<CustomResponse>(this.url);
  // }


  // get list of the server details 
  server$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  // add the new server details
  save$ = (server: Server) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.apiUrl}/server/save`, server)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  // ping the ip address
  ping$ = (ipAddress: string) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/server/ping${ipAddress}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  // delete by id 
  delete$ = (serverId: number) => <Observable<CustomResponse>>
    this.http.delete<CustomResponse>(`${this.apiUrl}/server/ping${serverId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  // filter status
  filter$ = (status: Status, response: CustomResponse): Observable<CustomResponse> => {
    return new Observable<CustomResponse>(subscriber => {
      console.log(response);

      if (status === Status.ALL) {
        subscriber.next({
          ...response,
          message: `Server filter by: ${status} status`
        });
      } else {
        const filteredServers = response.data.Server.filter(server => server.status === status);
        subscriber.next({
          ...response,
          message: filteredServers.length > 0 ?
            `Server filter by ${status === Status.SERVER_UP ? 'SERVER_UP' : 'SERVER_DOWN'} status` :
            `No server of ${status} found`,
          data: { Server: filteredServers }
        });
      }

      subscriber.complete();
    })
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  };


  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An error occours - Error Code:  ${error.status}`);
  }
}
