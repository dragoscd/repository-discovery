import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Repositories from './modules/repository/Repositories';
import GlobalStyles from './components/styled/GlobalStyles';

const App = () => (
  <>
    <GlobalStyles />
    <Switch>
      <Route exact path="/" component={Repositories} />
    </Switch>
  </>
);

export default App;
