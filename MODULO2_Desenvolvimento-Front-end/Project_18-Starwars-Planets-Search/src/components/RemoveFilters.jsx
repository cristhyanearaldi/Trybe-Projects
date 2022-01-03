import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function RemoveFilters() {
  const {
    filters: { filterByNumericValues },
    removeNumericFilters,
  } = useContext(PlanetsContext);

  return (
    <div>
      {
        filterByNumericValues.map((filter) => (
          <div key={ filter.column } data-testid="filter">
            <span>
              { `${filter.column} ${filter.comparison} ${filter.value}` }
            </span>
            <button
              type="button"
              onClick={ () => removeNumericFilters(filter.column) }
            >
              X
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default RemoveFilters;
