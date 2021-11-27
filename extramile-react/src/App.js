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
  StatesMapPage,
  CountiesMapPage,
  CalendarPage,
  SwarmPage,
  PiePage,
  AnalyticsPage1,
} from './Pages'

import { TopBar } from './Navigation';

import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
        <TopBar />
        <div className='content-container'>
          <Switch>
            <Route path="/search">
                <SearchPage />
            </Route>
            <Route path="/bar">
                <BarPage />
            </Route>
            <Route path="/statesMap">
                <StatesMapPage />
            </Route>
            <Route path="/pie">
                <PiePage />
            </Route>
            <Route path="/countiesMap">
              <CountiesMapPage />
              </Route>
            <Route path="/calendar">
                <CalendarPage />
            </Route>
            <Route path="/swarmplot">
              <SwarmPage />
            </Route>
            <Route path="/analytics1">
              <AnalyticsPage1 />
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


