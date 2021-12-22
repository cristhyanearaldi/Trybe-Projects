import React from 'react';
import search from '../images/loupe.png';
import shopp from '../images/shopp.png';
import Categories from '../components/Categories';
import ProductCards from '../components/ProductCards';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      searchInput: '',
      products: [],
      checkedInput: '',
      loading: false,
    };
    this.handleCategories = this.handleCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.handleCategories();
  }

  async handleCategories() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  handleChange({ target: { value } }) {
    this.setState({ searchInput: value });
  }

  handleSelect({ target: { checked, id } }) {
    if (checked) return this.setState({ checkedInput: id }, this.onChange);
  }

  async onChange() {
    const { checkedInput, searchInput } = this.state;
    this.setState({ loading: true });
    const products = await getProductsFromCategoryAndQuery(checkedInput, searchInput);
    this.setState({ products: products.results, loading: false });
  }

  render() {
    const { categories, searchInput, products, loading } = this.state;
    return (
      <div data-testid="home-initial-message">
        <div className="head-search">
          <img src={ shopp } alt="Online shopp" width="50px" />
          <div className="seach-box">
            <p className="search-title">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
            <input
              type="text"
              onChange={ this.handleChange }
              value={ searchInput }
              data-testid="query-input"
              placeholder="Pesquise por..."
            />
            <button
              className="btn btn-default"
              data-testid="query-button"
              type="button"
              onClick={ this.onChange }
            >
              <img src={ search } alt="lupa" width="15px" />
            </button>
          </div>
        </div>
        <div className="home-container">
          <Categories categories={ categories } onChange={ this.handleSelect } />
          {loading ? <h2>Carregando...</h2> : <ProductCards products={ products } />}
        </div>
        <footer>
          <p>
            Todos os direitos reservados para o Grupo 24, composto pelos incríveis devs:
            <br />
            Cristhyane Araldi, Écio Ferraz, Gabriel Benedetti, Lys Prestes e Yan Paroni
          </p>
        </footer>
      </div>

    );
  }
}
