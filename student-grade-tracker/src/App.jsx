import React, { Component } from 'react';
import AddStudentForm from './components/AddStudentForm';
import StudentList from './components/StudentList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      filterType: 'ALL' // 'ALL', 'PASSED', 'FAILED'
    };
  }

  // LIFECYCLE 1: componentDidMount
  // Triggers once immediately after the component is inserted into the DOM
  componentDidMount() {
    console.log('[Lifecycle] componentDidMount: Fetching initial data...');
    // Simulating an API call to load initial students
    setTimeout(() => {
      this.setState({
        students: [
          { id: 1, name: 'Alice Johnson', grade: 88, status: 'Passed' },
          { id: 2, name: 'Bob Smith', grade: 45, status: 'Failed' }
        ]
      });
    }, 800);
  }

  // LIFECYCLE 2: componentDidUpdate
  // Triggers every time the state or props change
  componentDidUpdate(prevProps, prevState) {
    if (prevState.students !== this.state.students) {
      console.log('[Lifecycle] componentDidUpdate: Student list was updated!', this.state.students);
    }
  }

  // State Management Handlers
  handleAddStudent = (newStudentData) => {
    const newStudent = {
      ...newStudentData,
      id: Date.now(),
      status: newStudentData.grade >= 50 ? 'Passed' : 'Failed'
    };

    this.setState((prevState) => ({
      students: [...prevState.students, newStudent]
    }));
  };

  handleDeleteStudent = (id) => {
    this.setState((prevState) => ({
      students: prevState.students.filter(student => student.id !== id)
    }));
  };

  handleToggleStatus = (id) => {
    this.setState((prevState) => ({
      students: prevState.students.map(student => 
        student.id === id 
          ? { ...student, status: student.status === 'Passed' ? 'Failed' : 'Passed' } 
          : student
      )
    }));
  };

  handleSortByGrade = () => {
    this.setState((prevState) => ({
      // Creating a copy of the array before sorting to avoid mutating state directly
      students: [...prevState.students].sort((a, b) => b.grade - a.grade)
    }));
  };

  handleFilter = (type) => {
    this.setState({ filterType: type });
  };

  render() {
    const { students, filterType } = this.state;

    // Apply filtering before passing data to StudentList
    const filteredStudents = students.filter((student) => {
      if (filterType === 'PASSED') return student.status === 'Passed';
      if (filterType === 'FAILED') return student.status === 'Failed';
      return true; // 'ALL'
    });

    return (
      <div className="app-container">
        <header>
          <h1>Student Grade Tracker</h1>
        </header>

        <main>
          <AddStudentForm addStudent={this.handleAddStudent} />

          <div className="control-panel">
            <button className="btn-sort" onClick={this.handleSortByGrade}>
              Sort by Grade (Highest First)
            </button>
            <div className="filter-group">
              <button onClick={() => this.handleFilter('ALL')} className={filterType === 'ALL' ? 'active' : ''}>All</button>
              <button onClick={() => this.handleFilter('PASSED')} className={filterType === 'PASSED' ? 'active' : ''}>Passed</button>
              <button onClick={() => this.handleFilter('FAILED')} className={filterType === 'FAILED' ? 'active' : ''}>Failed</button>
            </div>
          </div>

          <StudentList 
            students={filteredStudents} 
            deleteStudent={this.handleDeleteStudent}
            toggleStatus={this.handleToggleStatus}
          />
        </main>
      </div>
    );
  }
}

export default App;