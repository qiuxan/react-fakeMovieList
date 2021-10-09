import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './components/movie';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NaviBar from "./components/common/navibar";
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import ProtectedRoute from './components/common/protectedRoute';
// import NewMovie from './components/newMovie';
import Logout from './components/logout';
import auth from './services/authService';
import "react-toastify/dist/ReactToastify.css";
import './App.css';


class App extends React.Component {

  state = {};

  componentDidMount() {
    this.setState({ user: auth.getCurrentUser() });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NaviBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>


            {/* <Route path="/movies/:id" component={MovieForm}></Route> */}

            {/* <Route path="/movies/:id"
              render={props => {
                if (!user) return <Redirect to="/login" />;
                return <MovieForm {...props} />
              }}
            /> */}

            <ProtectedRoute
              path="/movies/:id"
              component={MovieForm}
            />


            <Route path="/movies"
              render={props => <Movies {...props} user={user} />}
            />
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
