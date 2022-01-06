import './App.css';
import {React} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {
  return (
    <Router>
    <div className="App">
      <h1>Pokedéx</h1>
      <hr/>
      <Switch>
      <Route path='/' exact>
        <Home/>
      </Route>
      <Route path='/LandingPage'>
        <LandingPage/>
      </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
