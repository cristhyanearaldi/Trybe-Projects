import React from 'react';
import { FaStar } from 'react-icons/fa';
import '../css/ProductDetails.css';

export default class ProductEvaluation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      hover: null,
      comment: '',
      email: '',
    };
    this.handleRating = this.handleRating.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleHoverEnter = this.handleHoverEnter.bind(this);
    this.handleHoverLeave = this.handleHoverLeave.bind(this);
  }

  handleRating({ target: { value } }) {
    this.setState({ rating: value });
  }

  handleChange({ target: { value, id } }) {
    this.setState({ [id]: value });
  }

  handleHoverEnter(rating) {
    this.setState({
      hover: rating,
    });
  }

  handleHoverLeave() {
    this.setState({
      hover: null,
    });
  }

  render() {
    const { rating, comment, hover, email } = this.state;
    const maxRating = 5;

    return (
      <div className="product-evaluation">
        <h4>Avaliações</h4>
        <form className="evaluation">
          <label htmlFor="email" className="evaluation-component">
            <input
              id="email"
              type="text"
              placeholder="Email"
              onChange={ this.handleChange }
              value={ email }
              className="form-control"
            />
          </label>
          <div className="ratingStars">
            {[...Array(maxRating)].map((star, i) => {
              const ratingValue = i + 1;

              return (
                <label htmlFor={ ratingValue } key={ ratingValue }>
                  <input
                    className="rating"
                    type="radio"
                    name="rating"
                    id={ ratingValue }
                    value={ ratingValue }
                    onClick={ this.handleRating }
                  />
                  <FaStar
                    className="star"
                    size="30"
                    onMouseEnter={ () => this.handleHoverEnter(ratingValue) }
                    onMouseLeave={ this.handleHoverLeave }
                    color={ ratingValue <= (hover || rating) ? '#3483fa' : '#C0C0C0' }
                  />
                </label>
              );
            })}
          </div>

          <label htmlFor="comment" className="evaluation-component text-area">
            <textarea
              id="comment"
              type="text"
              data-testid="product-detail-evaluation"
              placeholder="Mensagem (opcional)"
              onChange={ this.handleChange }
              value={ comment }
              className="form-control"
            />
          </label>
          <input
            type="button"
            value="Enviar"
            className="btn btn-primary evaluation-component"
          />
        </form>
      </div>
    );
  }
}
