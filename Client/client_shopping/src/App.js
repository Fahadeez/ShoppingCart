import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Store from './components/Store';
import Cart from './components/Cart';

function App() {
  return (
    <Router>
      <Switch>
        <Route  path="/store">
          <Store />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
      </Switch>
  </Router>
  );
}

export default App;
