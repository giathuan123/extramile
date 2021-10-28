import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import {
  SearchPage, 
  HomePage, 
  BarPage,
  MapsPage,
  CalendarPage,
  HistogramPage
} from './Pages'

import { NavBar } from './NavBar'

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="container">
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
            <Route path="/calendar">
                <CalendarPage />
            </Route>
            <Route path="/histogramchart">
                <HistogramPage />
            </Route>
            <Route path="/">
                <HomePage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
