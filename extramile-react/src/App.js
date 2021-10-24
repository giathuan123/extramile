import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import {
  SearchPage, 
  HomePage, 
  BarPage,
  MapsPage,
} from './Pages'

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
            <li>
              <Link to="/maps">Maps</Link>
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
          <Route path="/maps">
            <MapsPage />
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
