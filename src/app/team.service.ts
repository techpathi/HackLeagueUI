import { Injectable } from '@angular/core';
import { Team } from './model/team';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamsUrl = 'http://localhost:7000';

  constructor(private httpClient: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(`${this.teamsUrl}/teams`).
      pipe(tap(data => console.log('All teams fetched')),
        catchError(this.handleError));
  }

  addTeam(team: Team): Observable<any> {
    return this.httpClient.post<Team>(`${this.teamsUrl}/teams/add`, team).
      pipe(tap(data => console.log('Data Fetched:' + JSON.stringify(data))),
        catchError(this.handleError));
  }

  addMatchResult(matchResult: any): Observable<any> {
    return this.httpClient.post<any>(`${this.teamsUrl}/teams/result`, matchResult).
      pipe(tap(data => console.log('Data Fetched:' + JSON.stringify(data))),
        catchError(this.handleError));
  }


  private handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(errMsg);
  }
}
