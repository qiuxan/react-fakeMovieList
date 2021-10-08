import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import Movies from './components/movie';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NaviBar from "./components/common/navibar";
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import NewMovie from './components/newMovie';
import Logout from './components/common/logout';
import "react-toastify/dist/ReactToastify.css";
import './App.css';


class App extends React.Component {

  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      // console.log(user);
      this.setState({ user });
    } catch (ex) { }
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NaviBar user={this.state.user} />
        <main className="container">
          {/* <Movies /> */}

          <Switch>

            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/moviesnew" exact component={NewMovie}></Route>

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
}

export default App;
