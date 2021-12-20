import React from 'react';
import PropTypes from 'prop-types';

class SearchText extends React.Component {
  render() {
    const { searchText, onSearchTextChange } = this.props;
    return (
      <label htmlFor="searchText" data-testid="text-input-label">
        Inclui o texto
        <input
          name="searchText"
          type="text"
          id="searchText"
          className="input-config"
          data-testid="text-input"
          value={ searchText }
          onChange={ onSearchTextChange }
        />
      </label>
    );
  }
}

SearchText.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
};

export default SearchText;
