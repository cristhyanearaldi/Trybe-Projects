import React from 'react';
import PropTypes from 'prop-types';
import Title from './componentsAddMovie/Title';
import Subtitle from './componentsAddMovie/Subtitle';
import ImagePath from './componentsAddMovie/ImagePath';
import Storyline from './componentsAddMovie/Storyline';
import Rating from './componentsAddMovie/Rating';
import Genre from './componentsAddMovie/Genre';

const estado = {
  subtitle: '',
  title: '',
  imagePath: '',
  storyline: '',
  rating: 0,
  genre: 'action',
};

class AddMovie extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = estado;
  }

  handleChange({ target }) { // desestrutura 'event.target' para 'target'
    const { name } = target; // acessa 'name' de 'value' (pega todos os names, ex 'title')
    const value = target.type === 'checkbox' ? target.checked : target.value; // para checkbox o bolleano de retorno não fica em 'value', mas sim em 'checkbox'

    this.setState({
      [name]: value, // interpolando o valor da variável p ser o nome da chave do objeto (será title, subtitle...)
    });
  }

  handleSubmit(event) {
    event.preventDefault(); // para que botão não salve automaticamente na url ou recarregue a página
    const { onClick } = this.props;
    onClick(this.state);

    this.setState(estado);
  }

  render() {
    const { title, subtitle, imagePath, storyline, rating, genre } = this.state;
    return (
      <form data-testid="add-movie-form" className="add-movie-form">

        <Title
          title={ title }
          handleChange={ this.handleChange }
        />

        <Subtitle
          subtitle={ subtitle }
          handleChange={ this.handleChange }
        />

        <ImagePath
          imagePath={ imagePath }
          handleChange={ this.handleChange }
        />

        <Storyline
          storyline={ storyline }
          handleChange={ this.handleChange }
        />

        <Rating
          rating={ rating }
          handleChange={ this.handleChange }
        />

        <Genre
          genre={ genre }
          handleChange={ this.handleChange }
        />

        <button
          type="submit"
          data-testid="send-button"
          className="btn-add-movie"
          onClick={ this.handleSubmit }
        >
          Adicionar filme
        </button>

      </form>
    );
  }
}

AddMovie.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddMovie;
