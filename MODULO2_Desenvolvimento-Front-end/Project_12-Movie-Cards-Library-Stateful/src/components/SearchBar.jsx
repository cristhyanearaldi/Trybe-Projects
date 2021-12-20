import React from 'react';
import PropTypes from 'prop-types';
import SearchText from './componentsSearchBar/SearchText';

class SearchBar extends React.Component {
  render() {
    const {
      searchText,
      onSearchTextChange,
      bookmarkedOnly,
      onBookmarkedChange,
      selectedGenre,
      onSelectedGenreChange,
    } = this.props; // acessando o objeto e pegando as informações/propriedades passadas pro componente
    return (
      <form data-testid="search-bar-form" className="search-bar-form">

        <SearchText
          searchText={ searchText }
          onSearchTextChange={ onSearchTextChange }
        />

        <label htmlFor="bookmarkedOnly" data-testid="checkbox-input-label">
          Mostrar somente favoritos
          <input
            name="bookmarkedOnly"
            type="checkbox"
            id="bookmarkedOnly"
            className="input-config"
            data-testid="checkbox-input"
            checked={ bookmarkedOnly }
            onChange={ onBookmarkedChange }
          />
        </label>

        <label htmlFor="selectedGenre" data-testid="select-input-label">
          Filtrar por gênero
          <select
            name="selectedGenre"
            id="selectedGenre"
            data-testid="select-input"
            className="input-config"
            value={ selectedGenre }
            onChange={ onSelectedGenreChange }
          >
            <option value="" data-testid="select-option">Todos</option>
            <option value="action" data-testid="select-option">Ação</option>
            <option value="comedy" data-testid="select-option">Comédia</option>
            <option value="thriller" data-testid="select-option">Suspense</option>
          </select>
        </label>

      </form>
    );
  }
}

SearchBar.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  bookmarkedOnly: PropTypes.bool.isRequired,
  onBookmarkedChange: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onSelectedGenreChange: PropTypes.func.isRequired,
};

export default SearchBar;
