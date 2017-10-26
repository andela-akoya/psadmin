import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CourseListRow = ( {course} ) => {
  return (
    <tr>
      <td><a href={course.watchHref} target="_blank">Watch &nbsp;</a></td>
      <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
      <td>&nbsp; {course.authorId}</td>
      <td>&nbsp; {course.category}</td>
      <td>&nbsp; {course.length}</td>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired
};

export default CourseListRow;