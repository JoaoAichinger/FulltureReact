import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getPopularMovies, getMoviesByGenre, getImageUrl } from '../services/api';

const MovieListContainer = styled.div`
  width: 100%;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
  
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const MovieCard = styled.div`
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  border: 3px solid ${props => props.borderColor || '#e5e5e5'};
  transition: border-color 0.3s ease;
  
  @media (max-width: 767px) {
    height: 250px;
  }
`;

const MovieBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.badgeColor || '#6b7280'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NoImagePlaceholder = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 0.875rem;
  text-align: center;
  border-radius: 8px;
  border: 3px solid ${props => props.borderColor || '#e5e5e5'};
  
  @media (max-width: 767px) {
    height: 250px;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.1rem;
  color: #6b7280;
  padding: 3rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 1.1rem;
  color: #ef4444;
  padding: 3rem;
`;

const FilterInfo = styled.div`
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #22c55e;
`;

// Array de cores para as bordas e badges
const colors = [
  { border: '#ec4899', badge: '#ec4899' }, // Pink
  { border: '#f59e0b', badge: '#f59e0b' }, // Orange
  { border: '#22c55e', badge: '#22c55e' }, // Green
  { border: '#3b82f6', badge: '#3b82f6' }, // Blue
  { border: '#8b5cf6', badge: '#8b5cf6' }, // Purple
  { border: '#ef4444', badge: '#ef4444' }, // Red
  { border: '#06b6d4', badge: '#06b6d4' }, // Cyan
  { border: '#84cc16', badge: '#84cc16' }, // Lime
  { border: '#f97316', badge: '#f97316' }, // Orange-600
  { border: '#6366f1', badge: '#6366f1' }, // Indigo
];

// Mapeamento de IDs de gênero para nomes
const genreNames = {
  28: 'Action',
  35: 'Comedy', 
  18: 'Drama',
  27: 'Horror',
  10749: 'Romance'
};

const MovieList = ({ onMovieClick, searchQuery, selectedGenre }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data;
        if (selectedGenre) {
          // Buscar filmes por gênero
          data = await getMoviesByGenre(selectedGenre);
        } else {
          // Buscar filmes populares
          data = await getPopularMovies();
        }
        
        setMovies(data.results);
      } catch (err) {
        setError('Erro ao carregar filmes. Verifique sua conexão e tente novamente.');
        console.error('Erro ao buscar filmes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  const handleMovieClick = (movie) => {
    if (onMovieClick) {
      onMovieClick(movie);
    }
  };

  // Filtrar filmes baseado na busca
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  if (loading) {
    return (
      <MovieListContainer>
        <LoadingMessage>
          {selectedGenre ? `Carregando filmes de ${genreNames[selectedGenre]}...` : 'Carregando filmes...'}
        </LoadingMessage>
      </MovieListContainer>
    );
  }

  if (error) {
    return (
      <MovieListContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </MovieListContainer>
    );
  }

  return (
    <MovieListContainer>
      {selectedGenre && (
        <FilterInfo>
          📽️ Exibindo filmes do gênero: <strong>{genreNames[selectedGenre]}</strong>
        </FilterInfo>
      )}
      
      {searchQuery && (
        <FilterInfo>
          🔍 Resultados da busca por: <strong>"{searchQuery}"</strong>
        </FilterInfo>
      )}
      
      <MoviesGrid>
        {filteredMovies.map((movie, index) => {
          const colorIndex = index % colors.length;
          const movieColor = colors[colorIndex];
          const rating = Math.round(movie.vote_average);
          
          return (
            <MovieCard key={movie.id} onClick={() => handleMovieClick(movie)}>
              {movie.poster_path ? (
                <MoviePoster
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  borderColor={movieColor.border}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : (
                <NoImagePlaceholder borderColor={movieColor.border}>
                  Imagem não disponível
                </NoImagePlaceholder>
              )}
              <NoImagePlaceholder 
                style={{ display: 'none' }} 
                borderColor={movieColor.border}
              >
                Imagem não disponível
              </NoImagePlaceholder>
              <MovieBadge badgeColor={movieColor.badge}>
                {rating}
              </MovieBadge>
            </MovieCard>
          );
        })}
      </MoviesGrid>
      
      {filteredMovies.length === 0 && !loading && (
        <ErrorMessage>
          {searchQuery 
            ? `Nenhum filme encontrado para "${searchQuery}"`
            : selectedGenre 
              ? `Nenhum filme encontrado para o gênero ${genreNames[selectedGenre]}`
              : 'Nenhum filme encontrado'
          }
        </ErrorMessage>
      )}
    </MovieListContainer>
  );
};

export default MovieList;

