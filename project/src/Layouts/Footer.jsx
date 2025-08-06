import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  color: #6b7280;
  padding: 1.5rem 2rem;
  text-align: center;
  border-top: 1px solid #e5e5e5;
  margin-top: auto;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.875rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>React Movies© 2022. Todos os direitos reservados.</FooterText>
    </FooterContainer>
  );
};

export default Footer;

