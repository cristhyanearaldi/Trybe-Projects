import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async ({ target }) => {
    const { checked } = target;
    const { music } = this.props;
    this.setState({ loading: true });

    if (checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({ loading: false });
  }

  render() {
    const { music } = this.props;
    const { loading } = this.state;

    return (
      <section>
        { loading && <Loading /> }
        <div>
          <h3>{ music.trackName }</h3>

          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </div>
        <div>
          <label
            htmlFor={ music.trackId }
          >
            Favorita
            <input
              name="favorite"
              type="checkbox"
              id={ music.trackId }
              data-testid={ `checkbox-music-${music.trackId}` }
              onChange={ this.handleChange }
            />
          </label>
        </div>

      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
