import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  // Define API
  apiURL = 'http://localhost:8080/note';
  constructor(private http: HttpClient) { }
  
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // HttpClient API get() method => Fetch Notes
  getNotes(): Observable<Note> {
    return this.http
      .get<Note>(this.apiURL + '/')
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API get() method => Fetch Note
  getNote(id: any): Observable<Note> {
    return this.http
      .get<Note>(this.apiURL + '/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API post() method => Create Note
  createNote(note: Note): Observable<Note> {
    return this.http
      .post<Note>(
        this.apiURL + '/create',
        JSON.stringify(note),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API put() method => Update Note
  updateNote(id: number, note: Note): Observable<Note> {
    return this.http
      .put<Note>(
        this.apiURL + '/update',
        JSON.stringify(note),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API delete() method => Delete note
  deleteNote(id: number) {
    return this.http
      .delete<Note>(this.apiURL + '/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API deleteAll() method => Delete note
  deleteNotes() {
    return this.http
      .delete<Note>(this.apiURL + '/', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
