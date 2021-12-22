import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import SearchAlbum from '../components/SearchAlbum';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      loading: false,
      albums: [],
      artistNameAPI: '',
      APIsearched: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.formContent = this.formContent.bind(this);
    this.displayAlbums = this.displayAlbums.bind(this);
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      artist: value,
    });
  }

  handleClick() {
    const { artist } = this.state;
    this.setState({
      loading: true,
      artistNameAPI: artist,
    },
    () => {
      searchAlbumsAPI(artist).then((returnedAlbums) => {
        this.setState({
          loading: false,
          albums: returnedAlbums,
          artist: '',
          APIsearched: true,
        });
      });
    });
  }

  formContent() {
    const { artist } = this.state;
    const MIN_CHARAC = 2;
    return (
      <form>
        <label htmlFor="artist">
          <input
            type="text"
            name="artist"
            value={ artist }
            data-testid="search-artist-input"
            id="artist"
            placeholder="Nome do Artista"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button" // type submit necessitaria preventDefault
          data-testid="search-artist-button"
          disabled={ artist.length < MIN_CHARAC } // Source: "https://stackoverflow.com/questions/41488715/how-to-disable-button-in-react-js"
          id="entrar"
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
      </form>
    );
  }

  displayAlbums() {
    const { albums, artistNameAPI, APIsearched } = this.state;
    if (albums.length) {
      return (
        <section>
          <p>
            { `Resultado de álbuns de: ${artistNameAPI}`}
          </p>
          { albums.map((album) => (
            <SearchAlbum key={ album.collectionId } album={ album } />
          )) }

        </section>

      );
    }
    if (APIsearched) {
      return (
        <p>Nenhum álbum foi encontrado</p>
      );
    }
  }

  render() {
    const { loading, albums } = this.state;
    console.log(albums);
    return (
      <div data-testid="page-search">
        <Header />
        <p>{ loading ? <Loading /> : this.formContent() }</p>
        <p>{ (loading) ? <Loading /> : this.displayAlbums() }</p>
      </div>
    );
  }
}

export default Search;
