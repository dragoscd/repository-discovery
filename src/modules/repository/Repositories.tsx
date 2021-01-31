import React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Center } from '../../components/styled/Center';
import { Tab, Tabs } from '../../components/Tabs';
import MyRepositoriesContainer from './MyRepositories.container';
import NewRepositoriesContainer from './NewRepositories.container';

const RepositoriesWrapper = styled(Center)`
  max-width: 450px;
  padding: 24px;
  width: 100%;
`;

const RepositoriesHeader = styled.h1`
  margin-bottom: 32px;
`;

const StyledTabs = styled(Tabs)`
  margin-bottom: 24px;
`;

const Repositories: React.FC<RouteComponentProps> = ({ match, history }) => {
  return (
    <RepositoriesWrapper>
      <RepositoriesHeader>Repositories</RepositoriesHeader>
      <StyledTabs
        selectedTab={
          history.location.pathname.includes('starred') ? 'starred' : 'new'
        }
        onSelect={tabId => history.push(`/${tabId}`)}
      >
        <Tab tabId="new">New</Tab>
        <Tab tabId="starred">Starred</Tab>
      </StyledTabs>
      <Switch>
        <Redirect exact from={match.url} to="/new" />
        <Route path={`/new`} component={NewRepositoriesContainer}></Route>
        <Route path={`/starred`} component={MyRepositoriesContainer}></Route>
      </Switch>
      {/* <NewRepositoriesContainer /> */}
    </RepositoriesWrapper>
  );
};

export default Repositories;
