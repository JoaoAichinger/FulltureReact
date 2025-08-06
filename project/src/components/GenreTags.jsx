import React from 'react';
import styled from 'styled-components';

const TagsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const Tag = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  ${props => {
    const isActive = props.isActive;
    const opacity = isActive ? '1' : '0.8';
    const transform = isActive ? 'scale(1.05)' : 'scale(1)';
    const boxShadow = isActive ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)';
    
    switch (props.variant) {
      case 'action':
        return `
          background-color: #3b82f6;
          color: white;
          opacity: ${opacity};
          transform: ${transform};
          box-shadow: ${boxShadow};
          &:hover { 
            background-color: #2563eb; 
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          }
        `;
      case 'comedy':
        return `
          background-color: #f59e0b;
          color: white;
          opacity: ${opacity};
          transform: ${transform};
          box-shadow: ${boxShadow};
          &:hover { 
            background-color: #d97706; 
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
          }
        `;
      case 'drama':
        return `
          background-color: #8b5cf6;
          color: white;
          opacity: ${opacity};
          transform: ${transform};
          box-shadow: ${boxShadow};
          &:hover { 
            background-color: #7c3aed; 
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
          }
        `;
      case 'horror':
        return `
          background-color: #ef4444;
          color: white;
          opacity: ${opacity};
          transform: ${transform};
          box-shadow: ${boxShadow};
          &:hover { 
            background-color: #dc2626; 
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          }
        `;
      case 'romance':
        return `
          background-color: #ec4899;
          color: white;
          opacity: ${opacity};
          transform: ${transform};
          box-shadow: ${boxShadow};
          &:hover { 
            background-color: #db2777; 
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
          }
        `;
      default:
        return `
          background-color: #6b7280;
          color: white;
          opacity: ${opacity};
          transform: ${transform};
          box-shadow: ${boxShadow};
          &:hover { 
            background-color: #4b5563; 
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
          }
        `;
    }
  }}
  
  ${props => props.isActive && `
    &::after {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border-radius: 22px;
      background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
      z-index: -1;
    }
  `}
`;

const ClearButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 2px solid #e5e5e5;
  background-color: white;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #d1d5db;
    background-color: #f9fafb;
    transform: scale(1.05);
  }
`;

const GenreTags = ({ onGenreSelect, activeGenre }) => {
  const genres = [
    { id: 28, name: 'action', label: 'Action' },
    { id: 35, name: 'comedy', label: 'Comedy' },
    { id: 18, name: 'drama', label: 'Drama' },
    { id: 27, name: 'horror', label: 'Horror' },
    { id: 10749, name: 'romance', label: 'Romance' }
  ];

  const handleGenreClick = (genreId) => {
    if (onGenreSelect) {
      // Se clicar no gênero já ativo, limpa o filtro
      if (activeGenre === genreId) {
        onGenreSelect(null);
      } else {
        onGenreSelect(genreId);
      }
    }
  };

  const handleClearFilter = () => {
    if (onGenreSelect) {
      onGenreSelect(null);
    }
  };

  return (
    <TagsContainer>
      {genres.map((genre) => (
        <Tag
          key={genre.id}
          variant={genre.name}
          isActive={activeGenre === genre.id}
          onClick={() => handleGenreClick(genre.id)}
        >
          {genre.label}
        </Tag>
      ))}
      {activeGenre && (
        <ClearButton onClick={handleClearFilter}>
          Limpar Filtro
        </ClearButton>
      )}
    </TagsContainer>
  );
};

export default GenreTags;

