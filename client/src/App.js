import './App.css';
import {React} from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route path="/detail/:id" component={Detail} />
    </div>
    </Router>
  );
}

export default App;
