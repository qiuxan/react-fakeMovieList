import './App.css';
import Movies from './components/movie';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NaviBar from "./components/common/navibar";
import MovieForm from './components/movieForm';



function App() {
  return (
    <React.Fragment>
      <NaviBar />

      <main className="container">
        {/* <Movies /> */}

        <Switch>
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
