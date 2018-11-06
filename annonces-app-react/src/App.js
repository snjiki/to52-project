import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import ProfilePage from './components/pages/ProfilePage';
import Header from './components/Header/index';
import ItemPage from './components/ItemPage/index';
import MyItems from './components/MyItems/index';
import AuthRoute from './components/AuthRoute/index';

import './styles/animation.css';
import './styles/appStyle.css';


const App = () => (
 <div className='ui container'>
  <Header/>
  <Route path="/" exact component={HomePage} />
  <Route path="/login" exact component={LoginPage} />
  <Route path="/profile" exact component={ProfilePage} />
  <Route path="/item/:id" component={ItemPage} />
  <Route path="/myitems" component={MyItems} />

  
</div>
);

export default App;
