import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import Quiz from './Components/Quiz/Quiz';

export default function App() {
  return (
    <HelmetProvider>
      <Router >
        <Header />
        <div className="App">
          <Route exact path='/' component = {Main} />
          <Route path = '/quiz' component = {Quiz} />
        </div>
      </Router>
    </HelmetProvider>
  );
}
