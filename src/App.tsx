import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './modules/Home';
import GlobalStyles from './components/GlobalStyles';

const App = () => (
  <>
    <GlobalStyles />
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </>
);

export default App;
