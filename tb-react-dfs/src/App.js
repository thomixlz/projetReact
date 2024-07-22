import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminConferences from './pages/AdminConferences';
import AdminUsers from './pages/AdminUsers';
import ConferenceDetail from './pages/ConferenceDetail';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import CreateConference from './pages/CreateConference';  // Importer la page CreateConference

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/conference/:id" component={ConferenceDetail} />
          <PrivateRoute path="/admin/conferences" exact component={AdminConferences} />
          <PrivateRoute path="/admin/conference/create" component={CreateConference} />  {/* Ajouter cette ligne */}
          <PrivateRoute path="/admin/users" component={AdminUsers} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
