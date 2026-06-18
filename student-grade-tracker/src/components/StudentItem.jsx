import React, { Component } from 'react';

class StudentItem extends Component {
  // LIFECYCLE 3: componentWillUnmount
  // Triggers right before this component is destroyed (when deleted)
  componentWillUnmount() {
    console.log(`[Lifecycle] componentWillUnmount: ${this.props.student.name} was removed from the DOM.`);
  }

  render() {
    const { student, deleteStudent, toggleStatus } = this.props;
    const statusClass = student.status === 'Passed' ? 'passed' : 'failed';

    return (
      <div className={`student-card ${statusClass}`}>
        <div className="student-info">
          <h4>{student.name}</h4>
          <p>Grade: <strong>{student.grade}</strong></p>
          <p className="status-text">Status: {student.status}</p>
        </div>
        
        <div className="student-actions">
          <button className="btn-toggle" onClick={() => toggleStatus(student.id)}>
            Toggle Status
          </button>
          <button className="btn-delete" onClick={() => deleteStudent(student.id)}>
            Remove
          </button>
        </div>
      </div>
    );
  }
}

export default StudentItem;