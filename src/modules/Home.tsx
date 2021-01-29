import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

const StyledHomeWrapper = styled.div`
  background-color: red;
`;

class Home extends React.Component {
  render() {
    return (
      <StyledHomeWrapper>
        The beginning
        <Card />
      </StyledHomeWrapper>
    );
  }
}

export default Home;
