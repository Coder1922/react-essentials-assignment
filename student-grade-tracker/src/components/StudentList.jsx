import React, { Component } from 'react';
import StudentItem from './StudentItem';

class StudentList extends Component {
  render() {
    const { students, deleteStudent, toggleStatus } = this.props;

    if (students.length === 0) {
      return <p className="empty-state">No students found.</p>;
    }

    return (
      <div className="student-list">
        {students.map((student) => (
          <StudentItem 
            key={student.id} 
            student={student} 
            deleteStudent={deleteStudent}
            toggleStatus={toggleStatus}
          />
        ))}
      </div>
    );
  }
}

export default StudentList;