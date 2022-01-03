import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SortColumn() {
  const { filters, setFilters } = useContext(PlanetsContext);
  const [orderColumn, setOrderColumn] = useState('name');
  const [orderSort, setOrderSort] = useState('ASC');

  return (
    <form>
      <label htmlFor="columnSort">
        <select
          id="columnSort"
          data-testid="column-sort"
          onChange={ (event) => setOrderColumn(event.target.value) }
        >
          <option value="name">name</option>
          <option value="rotation_period">rotation_period</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="climate">climate</option>
          <option value="gravity">gravity</option>
          <option value="terrain">terrain</option>
          <option value="surface_water">surface_water</option>
          <option value="population">population</option>
          <option value="films">films</option>
          <option value="created">created</option>
          <option value="edited">edited</option>
          <option value="url">url</option>
        </select>
      </label>
      <label htmlFor="inputAsc">
        Ascendente
        <input
          type="radio"
          id="inputAsc"
          data-testid="column-sort-input-asc"
          value="ASC"
          name="sort"
          onClick={ (event) => setOrderSort(event.target.value) }
        />
      </label>
      <label htmlFor="inputDesc">
        Descendente
        <input
          type="radio"
          id="inputDesc"
          data-testid="column-sort-input-desc"
          value="DESC"
          name="sort"
          onClick={ (event) => setOrderSort(event.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => setFilters({
          ...filters,
          order: {
            column: orderColumn,
            sort: orderSort,
          },
        }) }
      >
        Ordenar
      </button>
    </form>
  );
}

export default SortColumn;
