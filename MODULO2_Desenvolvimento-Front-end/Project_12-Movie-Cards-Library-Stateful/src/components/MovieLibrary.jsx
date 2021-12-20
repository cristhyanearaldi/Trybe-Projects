// implement MovieLibrary component here
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);

    this.onSearchTextChange = this.onSearchTextChange.bind(this); // para que o this possa ser visto fora da func render (funções terão acesso ao this e ao estado)
    this.onBookmarkedChange = this.onBookmarkedChange.bind(this);
    this.onSelectedGenreChange = this.onSelectedGenreChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.filterMovies = this.filterMovies.bind(this);

    this.state = { // criando o estado inicial por meio da atribuição de um objeto à chave `state` do `this`
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies: props.movies,
    };
  }

  // funções que redefinem o estado ao receber novas entradas:
  onSearchTextChange({ target }) { // destructuring de event.target
    this.setState({ // método assíncrono que define o novo estado para o que é passado como argumento
      searchText: target.value, // captura a entrada digitada no input do form
    });
  }

  onBookmarkedChange({ target }) {
    this.setState({
      bookmarkedOnly: target.checked, // o booleano não fica no value, mas na chave checked
    });
  }

  onSelectedGenreChange({ target }) {
    this.setState({
      selectedGenre: target.value,
    });
  }

  onClick(movie) {
    const { movies } = this.state; // Destruturing na chave 'movies'; Atualiza estado do componente
    console.log(movie);
    this.setState({
      movies: [...movies, movie], // Na lista de filmes prévia, insere informações do filme adicionado (com push mudaria o array diretamente, o q não seria interessante em algumas situações e devido assincronicidade do setState; da forma que está retorna um novo array sem alterar o antigo)
    });
  }

  filterMovies() {
    const { searchText, selectedGenre, bookmarkedOnly, movies } = this.state;
    let filteredMovies = movies;
    if (searchText) {
      filteredMovies = movies.filter((movie) => movie.title.includes(searchText)
      || movie.subtitle.includes(searchText)
      || movie.storyline.includes(searchText));
    }

    if (bookmarkedOnly) {
      filteredMovies = movies.filter(({ bookmarked }) => bookmarked === bookmarkedOnly);
    }
    if (selectedGenre) {
      filteredMovies = movies.filter(({ genre }) => genre === selectedGenre);
    }
    return filteredMovies;
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre } = this.state;
    return (
      <div>
        <SearchBar // de acordo com as props recebidas no requisito 1 e declaradas no componente SearchBar
          searchText={ searchText } // passando o valor para a propriedade; {} pois pega o valor de uma variável
          onSearchTextChange={ this.onSearchTextChange } // como as funções estão dentro da classe, preciso usar o 'this'
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ this.onBookmarkedChange }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ this.onSelectedGenreChange }
        />
        <MovieList movies={ this.filterMovies() } />
        <AddMovie onClick={ this.onClick } />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  searchText: PropTypes.string,
  bookmarkedOnly: PropTypes.bool,
  selectedGenre: PropTypes.string,
  movies: PropTypes.array,
}.isRequired;

export default MovieLibrary;
