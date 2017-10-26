import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Redirect } from 'react-router-dom';
import PropTypes  from 'prop-types';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: {...this.props.course},
      errors: {},
      success: false
    };
    this.saveCourse = this.saveCourse.bind(this);
    this.updateCourseState = this.updateCourseState.bind(this);
  }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log(this.props.course, nextProps);
  //   if (this.props.course.id !== nextProps.course.id) {
  //     this.setState({course: nextProps.course});
  //   }
  // }

  updateCourseState(event) {
    const field = event.target.name;
    let course = {...this.state.course};
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  saveCourse(event) {
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course);
    this.setState({success: true});
  }

  render() {
    return (
      <div>
        {this.state.success &&  <Redirect to="/courses" />}
        <CourseForm
          course={this.state.course}
          allAuthors={this.props.authors}
          errors={this.state.errors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
        />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  console.log(state.courses);
  const courseId = ownProps.match.params.id;
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
  if (courseId) {
    course = getCourseById(state.courses, courseId);
  }
  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
