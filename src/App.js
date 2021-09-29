import './App.css';
import Movies from './components/movie';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NaviBar from "./components/common/navibar";
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import NewMovie from './components/newMovie';



function App() {
  return (
    <React.Fragment>
      <NaviBar />
      <main className="container">
        {/* <Movies /> */}

        <Switch>
          <Route path="/newmovie" component={NewMovie}></Route>

          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/movies/:id" component={MovieForm}></Route>

          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" to="/movies" exact />
          <Redirect to="/not-found" />
        </Switch>

      </main>
    </React.Fragment>
  );
}

export default App;
