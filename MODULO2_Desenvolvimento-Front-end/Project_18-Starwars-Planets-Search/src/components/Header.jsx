import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import logoStarWars from '../images/star-wars-2.png';

function Header() {
  const { handleChange } = useContext(PlanetsContext);

  return (
    <header>
      <img src={ logoStarWars } alt="logomarca star wars" />
      <h2>Projeto Star Wars | Trybe</h2>
      <label htmlFor="filterByName">
        <input
          type="text"
          id="filterByName"
          data-testid="name-filter"
          placeholder="filtrar por nome"
          onChange={ handleChange }
        />
      </label>
    </header>
  );
}

export default Header;
