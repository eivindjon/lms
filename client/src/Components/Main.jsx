import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import UserStats from '../pages/UserStats';
import AddCustom from '../pages/AddCustom';
import AddSubject from '../pages/AddSubject';


const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/UserStats/:id' component={UserStats}></Route>
      <Route exact path='/UserStats/addcustom/:id' component={AddCustom}></Route>
      <Route exact path='/Timeplan' component={AddSubject} ></Route>
    </Switch>
  );
}

export default Main;