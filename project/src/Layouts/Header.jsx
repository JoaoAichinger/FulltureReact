import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #000;
  text-decoration: none;
`;

const LogoCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #22c55e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  padding-right: 3rem;
  border: 2px solid #e5e5e5;
  border-radius: 25px;
  font-size: 1rem;
  width: 300px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #22c55e;
  }

  &::placeholder {
    color: #9ca3af;
  }

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 1rem;
  color: #9ca3af;
  font-size: 1.2rem;
  pointer-events: none;
`;

const Header = ({ onSearch }) => {
  const handleSearchChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <HeaderContainer>
      
      <Logo>
        ReactMovies
      </Logo>
      {/*
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Pesquise um filme..."
          onChange={handleSearchChange}
        />
        <SearchIcon>🔍</SearchIcon>
      </SearchContainer>
      */}
    </HeaderContainer>
  );
};

export default Header;

