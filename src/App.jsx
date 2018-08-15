import React, { Component } from 'react';
import Note from './Note';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noteText: '',
      notePriority: '1',
      notes:[],
      finalText: undefined,
    }
    this.updateNoteText = this.updateNoteText.bind(this);
    this.updateNotePriority = this.updateNotePriority.bind(this);
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.saveEditedNote = this.saveEditedNote.bind(this);
    this.finalUpdateText = this.finalUpdateText.bind(this);
    this.finalUpdatePriority = this.finalUpdatePriority.bind(this);
  }

updateNoteText(noteText) {
  this.setState({ noteText: noteText.target.value})
}

updateNotePriority(notePriority) {
  this.setState({ notePriority: notePriority.target.value})
}

finalUpdateText(e) {
  e.preventDefault()
  //console.log(e.target)
  this.setState({ finalText:e.target.value})
}

finalUpdatePriority(e) {
  //e.preventDefault()
  //console.log(e.target)
  this.setState({finalPriority:e.target.value})
}

addNote() {
  if (this.state.noteText === '') {return}
  //Make a copy of notes
  let notesArr = this.state.notes;
  //Create a new note/todo
  const todo = {
    text: this.state.noteText,
    priority: this.state.notePriority,
    editEnabled: false
  }
  //add the new todo inside of notes copy
  notesArr.push(todo);

  //update notes with new array
  this.setState({ 
    noteText: ' ',
    notes: notesArr
  });
  console.log(notesArr);
}

deleteNote(index) {
  let newArr = [...this.state.notes];
  newArr.splice(index, 1);
  this.setState({ notes: newArr});
}

editNote(index) {
  let notesArr = [...this.state.notes];
  let currentNote = notesArr[index];
  currentNote.editEnabled = true;
  notesArr.splice(index, 1, currentNote);
  this.setState({notes: notesArr});
  console.log(notesArr);
}

saveEditedNote(index){
  let theNotesArr = [...this.state.notes];
  let theCurrentNote = theNotesArr[index]
  
  theCurrentNote.text = this.state.finalText;
  theCurrentNote.priority = this.state.finalPriority;
  
  theCurrentNote.editEnabled = false;
  theNotesArr.splice(index, 1, theCurrentNote);
  this.setState({notes: theNotesArr, finalText: undefined });
  console.log(theNotesArr);


}

render() {
  // Go through all notes, and create a Note component for each one and put those notes inside of notes variable
  let notes = this.state.notes.map((singleNote, key) => {
    return <Note 
    key={key} 
    text={singleNote.text} 
    banana={singleNote.priority}
    editEnabled = {singleNote.editEnabled}
    
    deleteMethod= {this.deleteNote}
    editMethod = {this.editNote}
    saveMethod= {this.saveEditedNote}
    updateMethod= {this.updateNoteText}
    
    finalUpdateText= {this.finalUpdateText}
    finalText = {this.state.finalText}
    
    finalUpdatePriority = {this.finalUpdatePriority}
    finalPriority = {this.state.finalPriority}
    
    index = {key}
    />
  })
  
return (
      <div className='container'>
        <h1><font color="white">Create A List of Things To Do</font></h1>
        <h4><font color="white">And rate their priority</font></h4>
        <hr></hr>

        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">Create </div>
              <div className="panel-body">
                <label>Write what you want to get done</label>
                  <textarea 
                  type="object" 
                  ref={((input)=> {this.textInput = input})}
                  className="create-todo-text"
                  value={this.state.noteText}
                  onChange={this.updateNoteText}
                  />
                <label>Rate the priority</label>
                  <select 
                  className="create-todo-priority" 
                  onChange={this.updateNotePriority}>
                    <option value="1">high</option>
                    <option value="2">mid</option>
                    <option value="3">low</option>
                    
                  </select>

                <div className="panel-footer">
                  <button
                    type="text"
                    color="blue"
                    className="btn btn-default create-todo"
                    onClick={this.addNote}
                  >
                    Add
                 </button>
                </div>
              </div>

            </div>
          </div>

          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-heading">View Todos</div>
              <div className="panel-body">
              {notes}
              </div>

            </div>
          </div>

        </div>

      </div>
    );
  }
}
export default App;

