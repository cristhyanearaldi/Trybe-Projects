import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import RemoveFilters from './RemoveFilters';

function NumericFilters() {
  const {
    filters,
    setFilters,
    filteredPlanets,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
  } = useContext(PlanetsContext);

  const [filterOptions, setFilterOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const removeFilterOptions = (selectedColumn) => {
    const newOptions = [...filterOptions];
    newOptions.splice(newOptions.indexOf(selectedColumn), 1); // remove 1 elemento a partir do index de selectedColumn
    setFilterOptions(newOptions);
  };
  // Source1: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/splice'
  // Source 2: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf'

  const handleClick = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues, {
          column, comparison, value,
        },
      ],
    });
    filteredPlanets();
    removeFilterOptions(column);
  };

  return (
    <section>
      <label htmlFor="columnFilter">
        <select
          name="columnFilter"
          id="columnFilter"
          data-testid="column-filter"
          onChange={ (event) => setColumn(event.target.value) }
        >
          { filterOptions
            .map((item) => <option value={ item } key={ item }>{ item }</option>) }
        </select>
      </label>
      <label htmlFor="comparisonFilter">
        <select
          name="comparisonFilter"
          id="comparisonFilter"
          data-testid="comparison-filter"
          onChange={ (event) => setComparison(event.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="valueFilter">
        <input
          type="number"
          id="valueFilter"
          data-testid="value-filter"
          onChange={ (event) => setValue(event.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      <RemoveFilters />
    </section>
  );
}

export default NumericFilters;
