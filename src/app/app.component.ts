import { Component } from '@angular/core';
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

  constructor(public noteService: NotesService) {
    this.noteService.getNotes().subscribe((data: {}) => {
      console.log("Response" + JSON.stringify(data));
      if (data)
        this.notes = data;
    })

  }

  addNote() {
    this.notes.push({ id: this.notes.length + 'new', content: '' });
  };


  saveNote(event: any, index: number) {
    const id = event.srcElement.parentElement.parentElement.getAttribute('id');
    const content = event.target.innerText;
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
      event.target.style.backgroundColor = "#93df93";
      console.log("********* updating note to API *********", data.id)
    })
  }

  deleteNote(event: any, index: number) {
    const id = event.srcElement.parentElement.parentElement.parentElement.getAttribute('id');
    this.notes.splice(index, 1);
    if (!id.includes('new'))
      this.noteService.deleteNote(id).subscribe(data => {
        console.log("********* deleting note from API *********", id)
      })
  }

  resetNotes() {
    this.noteService.deleteNotes().subscribe(data => {
      this.notes = [];
      console.log("********* deleting note from API *********", data)
    })
    return;
  }
}
