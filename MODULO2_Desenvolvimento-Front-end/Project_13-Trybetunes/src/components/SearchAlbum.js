import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchAlbum extends React.Component {
  render() {
    const { album } = this.props;
    const { collectionId, artistName, collectionName, artworkUrl100 } = album;
    // const { collectionId, artistName, collectionName } = this.props;
    return (
      <section>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h3>{ artistName }</h3>
        <Link
          to={ `album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <h4>{ collectionName }</h4>
        </Link>
      </section>
    );
  }
}

SearchAlbum.propTypes = {
  album: PropTypes.shape({
    collectionId: PropTypes.number,
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};

export default SearchAlbum;
