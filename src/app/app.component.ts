import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from './note';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'post-IT-app';
  notes: any = [];

  constructor(public noteService: NotesService, private _snackBar: MatSnackBar) {
    this.noteService.getNotes().subscribe((data: {}) => {
      console.log("Response" + JSON.stringify(data));
      if (data) {
        this.notes = data;
        this.sendSuccessNotification("Notes loaded successfully", 1500);
      }
    }, error => {
      this.handleError(error);
    })

  }

  addNote() {
    this.notes.push({ id: this.notes.length + 'new', content: '' });
  };


  saveNote(event: any, index: number) {
    const id = event.srcElement.parentElement.parentElement.getAttribute('id');
    const content = event.target.innerText;
    if (content) {
      const json: Note = {
        'note': content
      }
      if (!id.includes('new')) {
        json.id = id;
      }
      console.log("JSON" + JSON.stringify(json))
      this.noteService.createNote(json).subscribe(data => {
        event.srcElement.parentElement.parentElement.setAttribute('id', data.id)
        this.notes[index].id = data.id;
        this.notes[index].content = data.note;
        event.target.style.backgroundColor = "rgb(255 248 198)";
        this.sendSuccessNotification("Note added successfully", 1000)
        console.log("********* updating note to API *********", data.id)
      }, error => {
        this.handleError(error);
      })
    }
  }

  deleteNote(event: any, index: number) {
    const id = event.srcElement.parentElement.parentElement.parentElement.getAttribute('id');
    this.notes.splice(index, 1);
    if (!id.includes('new'))
      this.noteService.deleteNote(id).subscribe(data => {
        this.sendSuccessNotification("Note deleted successfully", 2000)
        console.log("********* deleting note from API *********", id)
      }, error => {
        this.handleError(error);
      })
  }

  resetNotes() {
    this.noteService.deleteNotes().subscribe(data => {
      this.sendSuccessNotification("Notes deleted successfully", 2000)
      this.notes = [];
      console.log("********* deleting note from API *********", data)
    }, error => {
      this.handleError(error);
    })
  }

  handleError(error: any) {
    console.log("Oopsie!!!", error)
    this.sendNotification();
  }

  sendNotification() {
    this._snackBar.open('Something went wrong!, Please try again later', 'Close', {
      duration: 2000
    });
  }

  sendSuccessNotification(message: string, duration: number) {
    this._snackBar.open(message, 'Close', {
      duration: duration
    });
  }
}
