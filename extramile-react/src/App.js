import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import {SearchPage, HomePage, BarPage} from './Pages'

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search Data</Link>
            </li>
            <li>
              <Link to="/bar">Bar Data</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/bar">
            <BarPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
