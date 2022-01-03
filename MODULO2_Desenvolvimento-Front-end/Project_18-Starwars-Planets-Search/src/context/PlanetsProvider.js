import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

import planetsApi from '../services/planetsApi';

function PlanetsProvider({ children }) {
  const INITIAL_STATE = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  };

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState(INITIAL_STATE);
  const [renderPlanets, setRenderPlanets] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const fetchPlanets = async () => {
    const { results } = await planetsApi(); // pegando apenas a chave "results" da resposta da API
    setData(results);
    setRenderPlanets(results);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const handleChange = ({ target }) => {
    setFilters({
      ...filters,
      filterByName: {
        name: target.value,
      },
    });
    const displayFilteredPlanets = data.filter((planet) => (
      planet.name.toLowerCase().includes(target.value)));
    setRenderPlanets(displayFilteredPlanets);
  };

  const filteredPlanets = () => {
    const filtered = renderPlanets.filter((planet) => {
      if (!value) return planet;
      if (comparison === 'maior que') return Number(planet[column]) > Number(value);
      if (comparison === 'menor que') return Number(planet[column]) < Number(value);
      if (comparison === 'igual a') return Number(planet[column]) === Number(value);
      return filtered;
    });
    setRenderPlanets(filtered);
  };

  const removeNumericFilters = (param) => {
    const updatedFilters = filters.filterByNumericValues
      .filter((obj) => obj.column !== param);
    setFilters({
      ...filters,
      filterByNumericValues: updatedFilters,
    });
    setRenderPlanets(data);
  };

  const context = {
    data,
    isLoading,
    renderPlanets,
    filters,
    column,
    comparison,
    value,
    setFilters,
    setColumn,
    setComparison,
    setValue,
    handleChange,
    filteredPlanets,
    removeNumericFilters,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
