import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Layouts/Header';
import Main from '../Layouts/Main';
import Footer from '../Layouts/Footer';
import MovieList from '../components/MovieList';
import GenreTags from '../components/GenreTags';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const SubHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e5;
`;

const SubTitle = styled.h6`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Limpar filtro de gênero quando buscar
    if (query && selectedGenre) {
      setSelectedGenre(null);
    }
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
    // Limpar busca quando selecionar gênero
    if (genreId && searchQuery) {
      setSearchQuery('');
    }
  };

  return (
    <PageContainer>
      <Header onSearch={handleSearch} />
      <Main>
        <ContentContainer>
          <SubHeader>
            <SubTitle>Classify Data</SubTitle>
            <Description>
              Classify your data based on text that's more descriptive and carries more context.
            </Description>
          </SubHeader>
          
          <GenreTags 
            onGenreSelect={handleGenreSelect} 
            activeGenre={selectedGenre}
          />
          
          <MovieList 
            onMovieClick={handleMovieClick} 
            searchQuery={searchQuery}
            selectedGenre={selectedGenre}
          />
        </ContentContainer>
      </Main>
      <Footer />
    </PageContainer>
  );
};

export default HomePage;

