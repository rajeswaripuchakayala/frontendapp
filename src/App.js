import React from 'react';
import './App.css';
import Main from './Component/Main';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import Gallery from './Component/Gallery';
//import Upload from './Component/Upload';
//import Upload1 from './Component/Upload1';
import Date from './Component/Date';
import Upload2 from './Component/Upload2';
import Delete from './Component/Delete';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
    <Switch>
    <  Route exact path="/">
      <Main/>
      </Route>
      <Route path="/home">
      <Main/>
      </Route>
      <Route path="/Gallery">
      <Gallery/>
      </Route>
      <Route path="/Upload2">
      <Upload2/>
      </Route>
      <Route path="/delete">
      <Delete/>
      </Route>
      <Route path="/date">
      <Date/>
      </Route>
        </Switch>
 
    </BrowserRouter>
    </div>
  );
}

export default App;
