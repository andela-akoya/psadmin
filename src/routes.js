import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage';

const Routes = () => {
  return (
    <Route path="/" >
      <App>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/courses" component={CoursesPage}/>
          <Route exact path="/course" component={ManageCoursePage}/>
          <Route exact path="/course/:id" component={ManageCoursePage}/>
          <Route exact path="/about" component={AboutPage}/>
        </Switch>
      </App>
    </Route>
  )
};

export default Routes;
