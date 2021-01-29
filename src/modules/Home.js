import React from 'react';
import styled from 'styled-components';

const StyledHomeWrapper = styled.div`
  background-color: red;
`;

class Home extends React.Component {
  render() {
    return <StyledHomeWrapper>The beginning</StyledHomeWrapper>;
  }
}

export default Home;
