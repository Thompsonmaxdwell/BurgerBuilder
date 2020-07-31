import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuild from './containers/BurgerBuild/BurgerBuild';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

function App(props) {
  return (
    <div className="App">
      <Layout>
         <Switch>
          <Route  path="/checkout"  component={Checkout}/> 
          <Route  path="/orders"  component={Orders}/>
          <Route  path="/" exact component={BurgerBuild}/>
         </Switch>
      </Layout>

    </div>
  );
}

export default App;
