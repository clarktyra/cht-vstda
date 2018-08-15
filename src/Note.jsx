import React, { Component } from 'react';


class Note extends Component {
  constructor(props) {
    super(props);
      this.deleteHandler = this.deleteHandler.bind(this)
      this.editHandler = this.editHandler.bind(this)
      this.saveHandler = this.saveHandler.bind(this)
      this.updateHandler = this.updateHandler.bind(this)
      
    
  }

deleteHandler () { 
  this.props.deleteMethod(this.props.index);
}

editHandler () {
  this.props.editMethod(this.props.index);
}

saveHandler () {
  this.props.saveMethod(this.props.index);
}

updateHandler() {
  this.props.updateMethod(this.props.index);
}

render() {
    let className = '';
    if(this.props.banana == '1') {
      className = "alert alert-success";
    }
    if(this.props.banana == '2') {
      className = "alert alert-info";
    }
    if(this.props.banana == '3') {
      className = "alert alert-warning";
    }
      return(
        (this.props.editEnabled) ? 
        <div className="panel-body">
    <li className={`note ${className}`}>
    EDIT YOUR TODO
    <textarea 
    type="object" 
    className="curently-editing-todo update-todo-text"
    defaultValue ={this.props.text} 
    value={this.props.finalText}
    onChange={this.props.finalUpdateText}
    />
     <select 
     value = {this.props.finalPriority}
     className="create-todo-priority" 
     onChange={this.props.finalUpdatePriority}>
    <option  value="1">high</option>
    <option  value="2">mid</option>
    <option  value="3">low</option>          
    </select>

        <button onClick = {this.saveHandler} className="btn btn-default save-todo update-todo">   save</button>
        <button onClick = {this.deleteHandler} className="btn btn-default delete-todo">   delete</button>
      </li>
    </div>
  :

      <li className={`note ${className}`}>
        {this.props.text}
        <button onClick = {this.editHandler} className="btn btn-default edit-todo">   edit</button>
        <button onClick = {this.deleteHandler} className="btn btn-default delete-todo">   delete</button>
      </li>
      );

  }
}

export default Note;

