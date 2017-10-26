import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';

const CourseList = ({courses}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>&nbsp; Author</th>
          <th>&nbsp; Category</th>
          <th>&nbsp; Length</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course =>
          <CourseListRow key={course.id} course={course} />
        )}
      </tbody>
    </table>
  );
};

CourseList.proprTyprs = {
  courses: PropTypes.array.isRequired
};

export default CourseList;