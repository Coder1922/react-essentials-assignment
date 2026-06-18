import React, { Component } from 'react';

class AddStudentForm extends Component {
  constructor(props) {
    super(props);
    // Initializing state in the constructor
    this.state = {
      name: '',
      grade: '',
      error: ''
    };
  }

  // Handle input changes dynamically
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handle form submission and validation
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, grade } = this.state;
    const numericGrade = parseInt(grade, 10);

    // Validation
    if (!name.trim()) {
      this.setState({ error: 'Student name cannot be empty.' });
      return;
    }
    if (isNaN(numericGrade) || numericGrade < 0 || numericGrade > 100) {
      this.setState({ error: 'Grade must be a valid number between 0 and 100.' });
      return;
    }

    // Pass data back up to App via props
    this.props.addStudent({ name, grade: numericGrade });
    
    // Clear the form after successful submission
    this.setState({ name: '', grade: '', error: '' });
  };

  render() {
    return (
      <form className="student-form" onSubmit={this.handleSubmit}>
        <h3>Add New Student</h3>
        {this.state.error && <p className="error-msg">{this.state.error}</p>}
        
        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            type="number"
            name="grade"
            placeholder="Grade (0-100)"
            value={this.state.grade}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn-add">Add Student</button>
        </div>
      </form>
    );
  }
}

export default AddStudentForm;