# ReactMovies 🎬

Um projeto React completo para visualizar filmes populares usando a API do TMDB (The Movie Database).

## 📋 Funcionalidades

- ✅ Visualização de filmes populares
- ✅ Página de detalhes do filme com sinopse, nota e data de lançamento
- ✅ Roteamento entre páginas
- ✅ Design responsivo
- ✅ Estilização com styled-components
- ✅ Integração com API externa (TMDB)

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e servidor de desenvolvimento
- **React Router DOM** - Roteamento de páginas
- **Styled Components** - Estilização CSS-in-JS
- **Axios** - Cliente HTTP para requisições à API
- **TMDB API** - Base de dados de filmes

## 📦 Instalação e Configuração

### 1. Instalar dependências
```bash
pnpm install
```

### 2. Configurar API do TMDB

**IMPORTANTE**: Para que a aplicação funcione completamente, você precisa configurar uma API key do TMDB:

1. Crie uma conta gratuita em [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Faça login e vá em **Configurações** → **API**
3. Crie uma nova API key
4. Abra o arquivo `src/config/tmdb.js`
5. Substitua `YOUR_API_KEY_HERE` pela sua API key:

```javascript
export const TMDB_CONFIG = {
  API_KEY: 'sua_api_key_aqui', // ← Substitua aqui
  // ... resto da configuração
};
```

### 3. Executar o projeto
```bash
pnpm run dev
```

A aplicação estará disponível em `http://localhost:5173/`

## 📁 Estrutura do Projeto

```
src/
├── Pages/
│   ├── HomePage.jsx          # Página inicial com lista de filmes
│   └── MovieDetails.jsx      # Página de detalhes do filme
├── Layouts/
│   ├── Header.jsx           # Cabeçalho da aplicação
│   ├── Main.jsx             # Container principal
│   └── Footer.jsx           # Rodapé da aplicação
├── components/
│   └── MovieList.jsx        # Lista de filmes populares
├── services/
│   └── api.js               # Serviços de integração com TMDB API
├── config/
│   └── tmdb.js              # Configurações da API
├── App.jsx                  # Componente principal com roteamento
└── App.css                  # Estilos globais
```

## 🎯 Como Usar

1. **Página Inicial**: Visualize os filmes mais populares do momento
2. **Detalhes do Filme**: Clique em qualquer filme para ver:
   - Poster em alta qualidade
   - Título original
   - Sinopse completa
   - Data de lançamento
   - Nota de avaliação (1-10)
   - Botão para voltar à lista

## 🎨 Características do Design

- **Responsivo**: Funciona em desktop e mobile
- **Gradientes**: Banner com gradiente roxo/azul
- **Cards**: Filmes exibidos em cards com hover effects
- **Badges**: Notas coloridas baseadas na avaliação
- **Tipografia**: Fontes modernas e legíveis
- **Cores**: Esquema de cores consistente

## 🔧 Scripts Disponíveis

- `pnpm run dev` - Inicia servidor de desenvolvimento
- `pnpm run build` - Gera build de produção
- `pnpm run preview` - Visualiza build de produção

## 📝 Notas Importantes

- A API key do TMDB é **obrigatória** para o funcionamento completo
- Sem a API key, a aplicação mostrará uma mensagem de erro
- A API do TMDB é gratuita e não requer cartão de crédito
- O projeto usa português brasileiro (pt-BR) como idioma padrão

## 🤝 Contribuição

Este projeto foi desenvolvido como exercício educacional seguindo as especificações:
- Projeto criado com Vite
- Componentes organizados em pastas Pages e Layouts
- Integração completa com TMDB API
- Roteamento funcional
- Estilização com styled-components

## 📄 Licença

Este projeto é para fins educacionais.

---

**ReactMovies© 2022. Todos os direitos reservados.**

