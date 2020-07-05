import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuild from './containers/BurgerBuild/BurgerBuild';


function App(props) {
  return (
    <div className="App">
      <Layout>
         <BurgerBuild />
      </Layout>

    </div>
  );
}

export default App;
