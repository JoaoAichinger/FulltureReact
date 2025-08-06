import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Layouts/Header';
import Main from '../Layouts/Main';
import Footer from '../Layouts/Footer';
import { getMovieDetails, getImageUrl } from '../services/api';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MovieDetailsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PosterContainer = styled.div`
  flex-shrink: 0;
`;

const MoviePoster = styled.img`
  width: 300px;
  height: 450px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    display: block;
  }
`;

const MovieInfo = styled.div`
  flex: 1;
`;

const MovieTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  color: #333;
  line-height: 1.2;
`;

const MovieMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const RatingBadge = styled.span`
  background: ${props => props.rating >= 7 ? '#4CAF50' : props.rating >= 5 ? '#FF9800' : '#F44336'};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
`;

const ReleaseDate = styled.span`
  background: #e0e0e0;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
`;

const Overview = styled.div`
  margin-bottom: 2rem;
`;

const OverviewTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  color: #333;
`;

const OverviewText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin: 0;
`;

const BackButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #f44336;
  padding: 2rem;
`;

const NoImagePlaceholder = styled.div`
  width: 300px;
  height: 450px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  text-align: center;
  border-radius: 10px;
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      } catch (err) {
        setError('Erro ao carregar detalhes do filme. Tente novamente.');
        console.error('Erro ao buscar detalhes do filme:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const handleBackClick = () => {
    navigate('/');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <PageContainer>
        <Header title="Detalhes do Filme" />
        <Main>
          <LoadingMessage>Carregando detalhes do filme...</LoadingMessage>
        </Main>
        <Footer />
      </PageContainer>
    );
  }

  if (error || !movie) {
    return (
      <PageContainer>
        <Header title="Erro" />
        <Main>
          <ErrorMessage>{error || 'Filme não encontrado'}</ErrorMessage>
          <BackButton onClick={handleBackClick}>
            ← Voltar para a lista de filmes
          </BackButton>
        </Main>
        <Footer />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header title="Detalhes do Filme" />
      <Main>
        <MovieDetailsContainer>
          <PosterContainer>
            {movie.poster_path ? (
              <MoviePoster
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
              />
            ) : (
              <NoImagePlaceholder>
                Imagem não disponível
              </NoImagePlaceholder>
            )}
          </PosterContainer>
          
          <MovieInfo>
            <MovieTitle>{movie.title}</MovieTitle>
            
            <MovieMeta>
              <RatingBadge rating={movie.vote_average}>
                ⭐ {movie.vote_average.toFixed(1)}
              </RatingBadge>
              <ReleaseDate>
                📅 {formatDate(movie.release_date)}
              </ReleaseDate>
            </MovieMeta>

            {movie.overview && (
              <Overview>
                <OverviewTitle>Sinopse</OverviewTitle>
                <OverviewText>{movie.overview}</OverviewText>
              </Overview>
            )}

            <BackButton onClick={handleBackClick}>
              ← Voltar para a lista de filmes
            </BackButton>
          </MovieInfo>
        </MovieDetailsContainer>
      </Main>
      <Footer />
    </PageContainer>
  );
};

export default MovieDetails;

