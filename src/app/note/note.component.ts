import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Output() dismiss = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDismiss(event: any) {
    this.dismiss.emit(event);
  }

  onFocusOut(event: any) {
    this.save.emit(event)
  }

}
