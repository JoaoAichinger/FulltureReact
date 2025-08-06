import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.main`
  min-height: calc(100vh - 140px);
  background-color: white;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Main = ({ children }) => {
  return (
    <MainContainer>
      {children}
    </MainContainer>
  );
};

export default Main;

