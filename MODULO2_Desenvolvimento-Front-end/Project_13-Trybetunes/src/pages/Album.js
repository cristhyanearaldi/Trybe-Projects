import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
// import getFavoriteSongs from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      loading: true,
    };

    this.fetchMusics = this.fetchMusics.bind(this);
  }

  componentDidMount() {
    this.fetchMusics();
  }

  async fetchMusics() {
    const { match: { params: { id } } } = this.props;

    const fetchMusicsAPI = await getMusics(id);

    this.setState({
      musics: fetchMusicsAPI,
      loading: false,
    });
  }

  render() {
    const { loading, musics } = this.state;

    if (loading) {
      return (
        <div data-testid="page-album">
          <Header />
          <Loading />
        </div>
      );
    }

    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <div>

            <h3 data-testid="artist-name">{musics[0].artistName}</h3>
            <h4 data-testid="album-name">{musics[0].collectionName}</h4>
          </div>
          <div>
            {musics.map((music, index) => {
              if (index > 0) {
                return <MusicCard key={ music.trackId } music={ music } />;
              }
              return null; // Source: "https://stackoverflow.com/questions/45014094/how-do-i-fix-expected-to-return-a-value-at-the-end-of-arrow-function-warning"
            })}
          </div>
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
// Source: "https://stackoverflow.com/questions/47311310/proptypes-isrequired-on-react-router-4-params-prop"

export default Album;
