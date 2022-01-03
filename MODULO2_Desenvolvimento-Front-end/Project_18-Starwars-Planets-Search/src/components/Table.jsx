import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data,
    isLoading,
    renderPlanets,
  } = useContext(PlanetsContext);

  const renderHeader = () => {
    const headerContent = Object.keys(data[0]);
    const contentFiltered = headerContent.filter((content) => (content !== 'residents'));
    return contentFiltered.map((title) => (<th key={ title }>{ title }</th>));
  };

  if (isLoading) return <p>Carregando...</p>;

  return (
    <table className="table">
      <thead className="table-head">
        <tr>
          { renderHeader() }
        </tr>
      </thead>
      <tbody className="table-body">
        {
          renderPlanets.map((planet, i) => (
            <tr key={ i }>
              <td data-testid="planet-name">{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
