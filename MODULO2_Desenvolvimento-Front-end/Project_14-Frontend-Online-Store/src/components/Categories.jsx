import React from 'react';
import PropTypes from 'prop-types';

export default class Categories extends React.Component {
  render() {
    const { categories, onChange } = this.props;
    return (
      <div className="categories-sidebar">
        <aside>
          {categories.map(({ id, name }) => (
            <label htmlFor={ id } key={ id } className="control-label">
              <input
                className="side-bar"
                type="radio"
                data-testid="category"
                key={ id }
                id={ id }
                name="categories"
                onChange={ onChange }
              />
              { name }
            </label>
          ))}
        </aside>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};
