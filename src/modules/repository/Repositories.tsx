import React from 'react';
import styled from 'styled-components';
import Card from '../../components/Card';
import { Center } from '../../components/styled/Center';
import NewRepositoriesContainer from './NewRepositories.container';

const StyledRepositoriesWrapper = styled(Center)`
  max-width: 450px;
  padding: 24px;
  width: 100%;
`;

class Home extends React.Component {
  render() {
    return (
      <StyledRepositoriesWrapper>
        <h1>Repositories</h1>
        <div>Tabs</div>
        <NewRepositoriesContainer />
      </StyledRepositoriesWrapper>
    );
  }
}

export default Home;
