import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom"
import {lazy,Suspense} from "react"
const ApiCall = lazy(()=>import("./component/ApiCall"));
const RowDetails = lazy(()=>import("./component/RowDetails"));


const App:React.FC = () => {
  return (
    <div data-testid="app">
    <Suspense fallback={<h2>Loading...</h2>}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ApiCall}/>
          <Route path="/RowDetails" component={RowDetails}/>
        </Switch>
      </BrowserRouter>
    </Suspense>
    </div>
    
  );
}

export default App;
